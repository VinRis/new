import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate and export professional reports.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generate Farm Report</CardTitle>
            <CardDescription>
              Create high-quality PDF reports for your livestock. Perfect for presenting to investors, banks for financing, or for your own records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center text-center">
              <FileDown className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Export</h3>
              <p className="text-sm text-muted-foreground mb-4">Select a report type and date range to begin.</p>
              <Button>
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
