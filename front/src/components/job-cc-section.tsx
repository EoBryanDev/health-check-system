"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Info } from "lucide-react";
import { useJobsQuery } from "@/hooks/queries/use-job-data";
import { LoadingState } from "./loading";
import {
  useRunAllJobsMutation,
  useRunSingleJobMutation,
} from "@/hooks/mutations/use-run-job";
import { toast } from "sonner";

export function JobCCSection() {
  const [jobFilter, setJobFilter] = useState("");

  const runSingleJob = useRunSingleJobMutation();
  const runAllJobs = useRunAllJobsMutation();

  const { data: jobData, isLoading: jobIsLoading } = useJobsQuery();

  if (jobIsLoading) {
    return <LoadingState />;
  }

  const filteredJobs = jobData
    ? jobData.filter((job) => {
        if (jobFilter === "") {
          return true;
        }
        return job.job_id === jobFilter;
      })
    : [];

  const handleClick = async () => {
    try {
      console.log(jobFilter);

      if (jobFilter === "") {
        await runAllJobs.mutateAsync();
      } else {
        await runSingleJob.mutateAsync(jobFilter);
      }
      toast.success("JobRunned!");
    } catch (error) {
      toast.error("There was not possible run job");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="job">Job</Label>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobData?.map((job) => (
                    <SelectItem key={job.job_id} value={job.job_id}>
                      {job.job_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full cursor-pointer sm:w-auto"
              onClick={handleClick}
            >
              <Play className="mr-2 h-4 w-4" />
              Run job
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Execution Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium">Group ID</th>
                  <th className="p-2 text-left font-medium">Job ID</th>
                  <th className="p-2 text-left font-medium">Job</th>
                  <th className="p-2 text-left font-medium">Job Description</th>
                  <th className="hidden p-2 text-left font-medium sm:table-cell">
                    Created At
                  </th>
                  <th className="p-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50 border-b">
                    <td className="p-2">{item.group_id}</td>
                    <td className="p-2">{item.job_id}</td>
                    <td className="p-2">{item.job_name}</td>
                    <td className="p-2">{item.job_description}</td>
                    <td className="hidden p-2 sm:table-cell">
                      {item.created_at}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {
                        <Badge
                          className={`${item.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                        >
                          {item.active ? "active" : "inactive"}
                        </Badge>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
