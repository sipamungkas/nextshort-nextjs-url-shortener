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
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getUrls } from "./action";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function TableUrl() {
  const [urls, setUrls] = useState([]);

  const fetchData = async () => {
    const res = await getUrls();
    if (res.success) {
      setUrls(res.data as unknown as []);
    } else {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.length === 0 && (
          <TableRow className="">
            <TableCell colSpan={7} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
        {urls.map((item: any) => (
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
            <TableCell>{item.qr}</TableCell>
            <TableCell>{item.clicks || 0}</TableCell>
            <TableCell>{item.status || "active"}</TableCell>
            <TableCell>{item.created_at}</TableCell>
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
                    <DropdownMenuItem className="cursor-pointer">
                      Disable
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:text-red-500 hover:bg-red-100">
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
