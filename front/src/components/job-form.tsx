"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, TJobSchema } from "@/schemas/configurations.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useEditJobMutation } from "@/hooks/mutations/use-edit-job";
// import { useRemoveJobMutation } from "@/hooks/mutations/use-remove-job";
import { useJobsQuery } from "@/hooks/queries/use-job-data";
import { Pencil, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useCreateJob } from "@/hooks/mutations/use-add-job";
// import { IJob } from "@/interfaces/IConfigurations";

export function JobsForm() {
  // const [editingItem, setEditingItem] = useState<IJob | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TJobSchema>({
    resolver: zodResolver(jobSchema),
  });

  const { data: jobsData } = useJobsQuery();

  console.log(jobsData);
  
  const createJobMutation = useCreateJob();
  // const editJobMutation = useEditJobMutation();
  // const removeJobMutation = useRemoveJobMutation();

  const isMutating = createJobMutation.isPending 
  //|| editJobMutation.isPending || removeJobMutation.isPending;

  // const onEditClick = (item: IJob) => {
  //   setEditingItem(item);
  //   setValue("group_id", item.group_id);
  //   setValue("group_name", item.group);
  //   setValue("job_name", item.name);
  //   setValue("job_description", item.description || "");
  //   setValue("interval_time", item.interval_time);
  // };

  // const onRemoveClick = (id: string) => {
  //   removeJobMutation.mutate(id);
  // };

  // const onCancelClick = () => {
  //   setEditingItem(null);
  //   reset();
  // };

  const onSubmit = (data: TJobSchema) => {
    // if (editingItem) {
    //   editJobMutation.mutate({ ...editingItem, name: data.job_name, group: data.group_name, interval_time: data.interval_time, description: data.job_description, group_id: data.group_id });
    //   setEditingItem(null);
    // } else {
      createJobMutation.mutate(data);
    // }
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_name">Job Name</Label>
              <Input id="job_name" placeholder="Ex: Daily Report" {...register("job_name")} />
              {errors.job_name && <p className="text-red-500 text-sm">{errors.job_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="group_name">Group Name</Label>
              <Input id="group_name" placeholder="Ex: Backend Team" {...register("group_name")} />
              {errors.group_name && <p className="text-red-500 text-sm">{errors.group_name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="group_id">Group ID</Label>
              <Input id="group_id" placeholder="Ex: abc-123" {...register("group_id")} />
              {errors.group_id && <p className="text-red-500 text-sm">{errors.group_id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval_time">Interval (ms)</Label>
              <Input id="interval_time" type="number" placeholder="Ex: 5000" {...register("interval_time", { valueAsNumber: true })} />
              {errors.interval_time && <p className="text-red-500 text-sm">{errors.interval_time.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="job_description">Description (Optional)</Label>
              <Textarea id="job_description" placeholder="A brief description of the job" {...register("job_description")} />
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={isMutating}>
              {isMutating ? "Submitting..." : (
                // editingItem ? "Save Changes" : 
                "Add Job"
              )}
            </Button>
            {/* {editingItem && (
              <Button type="button" onClick={onCancelClick} variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            )} */}
          </div>
        </form>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Group</th>
                  {/* <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Action</th> */}
                </tr>
              </thead>
              <tbody className="divide-y">
                {jobsData?.map((item) => (
                  <tr key={item.job_id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{item.job_name}</td>
                    <td className="px-4 py-3 text-sm">{item.group_name}</td>
                    {/* <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 p-0 bg-transparent"
                                onClick={() => onEditClick(item)}
                                disabled={isMutating}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 bg-transparent"
                          onClick={() => onRemoveClick(item.job_id)}
                          disabled={isMutating}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}