import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockHistory } from "@/lib/data";
import { Download, Filter, Search } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Record History</h1>
        <p className="text-muted-foreground">View all records saved for your farm.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Date
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
