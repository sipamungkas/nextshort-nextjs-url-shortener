"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { deleteurl, disableUrl } from "./action";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function TableUrl({ data }: { data: any[] }) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return (
    <Table>
      <TableCaption>A list of your masked links.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Shortlink</TableHead>
          <TableHead>Original Link</TableHead>
          <TableHead>QRCode</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow className="">
            <TableCell colSpan={7} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
        {data.map((item: any) => (
          <TableRow key={item.id} className="text-card-foreground/80">
            <TableCell>
              <div className="flex flex-row items-center">
                <p>{`${BASE_URL}/${item.custom_url}`}</p>
                <Copy
                  onClick={() => handleCopy(`${BASE_URL}/${item.custom_url}`)}
                  className="h-3"
                />
              </div>
            </TableCell>
            <TableCell>{item.original_url}</TableCell>
            <TableCell>{item.qr ?? "No QR available"}</TableCell>
            <TableCell className="text-center">
              {item.daily_clicks.length > 0
                ? item.daily_clicks[0].click_count
                : 0}
            </TableCell>
            <TableCell>
              <Badge variant={item.is_active ? "default" : "destructive"}>
                {item.is_active ? "Active" : "Disabled"}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(item.created_at)}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {/* <Button size="sm" variant="ghost"> */}
                  <Ellipsis size={20} />
                  {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        disableUrl({
                          id: item.id,
                          isActive: !item.is_active,
                        });
                      }}
                    >
                      {item.is_active ? "Disable" : "Enable"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:text-red-500 hover:bg-red-100"
                      onClick={async () => await deleteurl(item.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
