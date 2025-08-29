"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useGroupsQuery } from "@/hooks/queries/use-group-data";
import { LoadingState } from "./loading";
import { toast } from "sonner";
import { useRunGroupJobsMutation } from "@/hooks/mutations/use-run-job";

export function GroupCCSection() {
  const [groupFilter, setGroupFilter] = useState("");
  const runGroupJobs = useRunGroupJobsMutation();
  const { data: groupData, isLoading: groupIsLoading } = useGroupsQuery();

  if (groupIsLoading) {
    return <LoadingState />;
  }

  const filteredGroups = groupData
    ? groupData.filter((group) => {
        if (groupFilter === "") {
          return true;
        }
        return group.group_id === groupFilter;
      })
    : [];

  const handleClick = async () => {
    try {
      await runGroupJobs.mutateAsync(groupFilter);
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
              <Label htmlFor="group">Group</Label>
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groupData?.map((group) => (
                    <SelectItem key={group.group_id} value={group.group_id}>
                      {group.group_name}
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
              Run Group
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent sm:w-auto"
            >
              <Info className="mr-2 h-4 w-4" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Group Execution Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium">Group ID</th>
                  <th className="p-2 text-left font-medium">Group</th>
                  <th className="p-2 text-left font-medium">
                    Group Description
                  </th>
                  <th className="hidden p-2 text-left font-medium sm:table-cell">
                    Created At
                  </th>
                  <th className="p-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50 border-b">
                    <td className="p-2">{item.group_id}</td>
                    <td className="p-2">{item.group_name}</td>
                    <td className="p-2">{item.group_description}</td>
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
