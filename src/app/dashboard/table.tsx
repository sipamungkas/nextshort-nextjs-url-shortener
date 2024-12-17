"use client";

import { Button } from "@/components/ui/button";
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

const data = [
  {
    shortlink: "short.ly/abc123",
    originalLink: "https://example.com/long-url-1",
    qrCode: "QR_CODE_1",
    clicks: 120,
    status: "Active",
    date: "2023-01-01",
  },
  {
    shortlink: "short.ly/def456",
    originalLink: "https://example.com/long-url-2",
    qrCode: "QR_CODE_2",
    clicks: 85,
    status: "Inactive",
    date: "2023-02-15",
  },
  {
    shortlink: "short.ly/ghi789",
    originalLink: "https://example.com/long-url-3",
    qrCode: "QR_CODE_3",
    clicks: 200,
    status: "Active",
    date: "2023-03-10",
  },
];

export function TableUrl() {
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
        {data.map((item) => (
          <TableRow key={item.shortlink} className="text-card-foreground/80">
            <TableCell>
              <div className="flex flex-row items-center">
                <p>{item.shortlink}</p>
                <Copy
                  onClick={() => handleCopy(item.shortlink)}
                  className="h-3"
                />
              </div>
            </TableCell>
            <TableCell>{item.originalLink}</TableCell>
            <TableCell>{item.qrCode}</TableCell>
            <TableCell>{item.clicks}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.date}</TableCell>
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
