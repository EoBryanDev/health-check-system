"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/schemas/configurations.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddServiceMutation } from "@/hooks/mutations/use-add-service";
import { useEditServiceMutation } from "@/hooks/mutations/use-edit-service";
import { useRemoveServiceMutation } from "@/hooks/mutations/use-remove-service";
import { useServicesQuery } from "@/hooks/queries/use-service-data";
import { Pencil, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { IService } from "@/interfaces/IConfigurations";
import { TServiceSchema } from "@/schemas/configurations.schema";

export function ServicesForm() {
  const [editingItem, setEditingItem] = useState<IService | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      last_run: null,
      rate_limit_tolerance: 0,
      job_id: "",
      job_name: ""
    }
  });

  const { data: servicesData } = useServicesQuery();
  const addServiceMutation = useAddServiceMutation();
  const editServiceMutation = useEditServiceMutation();
  const removeServiceMutation = useRemoveServiceMutation();

  const isMutating = addServiceMutation.isPending || editServiceMutation.isPending || removeServiceMutation.isPending;

  const onEditClick = (item: IService) => {
    setEditingItem(item);
    setValue("group_id", item.group_id || "");
    setValue("group_name", item.group || "");
    setValue("job_id", item.job_id || "");
    setValue("job_name", item.job_name || "");
    setValue("service_name", item.name);
    setValue("service_description", item.description || "");
    setValue("service_url", item.url);
    setValue("rate_limit_tolerance", item.rate_limit_tolerance);
    setValue("last_run", item.last_run);
  };

  const onRemoveClick = (id: string) => {
    removeServiceMutation.mutate(id);
  };

  const onCancelClick = () => {
    setEditingItem(null);
    reset();
  };

  const onSubmit = (data: TServiceSchema) => {
    if (editingItem) {
      editServiceMutation.mutate({ 
        ...editingItem,
        group_id: data.group_id,
        group: data.group_name,
        job_id: data.job_id,
        job_name: data.job_name,
        name: data.service_name,
        description: data.service_description,
        url: data.service_url,
        rate_limit_tolerance: data.rate_limit_tolerance,
        last_run: data.last_run,
      });
      setEditingItem(null);
    } else {
      addServiceMutation.mutate(data);
    }
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service_name">Service Name</Label>
              <Input id="service_name" placeholder="Ex: User API" {...register("service_name")} />
              {errors.service_name && <p className="text-red-500 text-sm">{errors.service_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_url">Service URL</Label>
              <Input id="service_url" placeholder="Ex: https://api.example.com" {...register("service_url")} />
              {errors.service_url && <p className="text-red-500 text-sm">{errors.service_url.message}</p>}
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
              <Label htmlFor="job_id">Job ID (Optional)</Label>
              <Input id="job_id" placeholder="Ex: xyz-456" {...register("job_id")} />
              {errors.job_id && <p className="text-red-500 text-sm">{errors.job_id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_name">Job Name (Optional)</Label>
              <Input id="job_name" placeholder="Ex: Daily Report" {...register("job_name")} />
              {errors.job_name && <p className="text-red-500 text-sm">{errors.job_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate_limit_tolerance">Rate Limit Tolerance</Label>
              <Input id="rate_limit_tolerance" type="number" placeholder="Ex: 100" {...register("rate_limit_tolerance", { valueAsNumber: true })} />
              {errors.rate_limit_tolerance && <p className="text-red-500 text-sm">{errors.rate_limit_tolerance.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="service_description">Description (Optional)</Label>
              <Textarea id="service_description" placeholder="A brief description of the service" {...register("service_description")} />
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={isMutating}>
              {isMutating ? "Submitting..." : (
                editingItem ? "Save Changes" : "Add Service"
              )}
            </Button>
            {editingItem && (
              <Button type="button" onClick={onCancelClick} variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            )}
          </div>
        </form>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">URL</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {servicesData?.map((item) => (
                  <tr key={item.service_id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm">{item.url}</td>
                    <td className="px-4 py-3">
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
                          onClick={() => onRemoveClick(item.service_id)}
                          disabled={isMutating}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
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