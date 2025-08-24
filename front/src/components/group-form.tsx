"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema, TGroupSchema } from "@/schemas/configurations.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGroupsQuery } from "@/hooks/queries/use-group-data";
import { Pencil, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useState } from "react";
import { useCreateGroup } from "@/hooks/mutations/use-add-group";


export function GroupsForm() {
  // const [editingItem, setEditingItem] = useState<IGroup | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setValue,
  } = useForm<TGroupSchema>({
    resolver: zodResolver(groupSchema),
  });

  const { data: groupsData } = useGroupsQuery();
  const createGroupMutation = useCreateGroup();
  // const editGroupMutation = useEditGroupMutation();
  // const removeGroupMutation = useRemoveGroupMutation();

  const isMutating = createGroupMutation.isPending 
  /*|| editGroupMutation.isPending || removeGroupMutation.isPending;*/

  // const onEditClick = (item: IGroup) => {
  //   setEditingItem(item);
  //   setValue("group_name", item.name);
  //   setValue("users_email", item.user);
  //   setValue("group_description", item.description || "");
  // };

  // const onRemoveClick = (id: string) => {
  //   removeGroupMutation.mutate(id);
  // };
  
  // const onCancelClick = () => {
  //   setEditingItem(null);
  //   reset();
  // };

  const onSubmit = (data: TGroupSchema) => {
    /*if (editingItem) {
      editGroupMutation.mutate({ ...editingItem, name: data.group_name, user: data.users_email, description: data.group_description });
      setEditingItem(null);
    } else {*/
      createGroupMutation.mutate(data);
    /*}*/
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group_name">Group Name</Label>
              <Input id="group_name" placeholder="Ex: Backend Team" {...register("group_name")} />
              {errors.group_name && <p className="text-red-500 text-sm">{errors.group_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="users_email">User Email</Label>
              <Input id="users_email" placeholder="Ex: user@example.com" {...register("users_email")} />
              {errors.users_email && <p className="text-red-500 text-sm">{errors.users_email.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="group_description">Description (Optional)</Label>
              <Textarea id="group_description" placeholder="A brief description of the group" {...register("group_description")} />
            </div>
          </div>

         <div className="flex justify-center gap-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={isMutating}>
              {isMutating ? "Submitting..." : (
                // editingItem ? "Save Changes" :
                 "Add Group"
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
                  {/* <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th> */}
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {groupsData?.map((item) => (
                  <tr key={item.group_id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{item.group_name}</td>
                    {/* <td className="px-4 py-3 text-sm">{item.created_by}</td> */}
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
                          onClick={() => onRemoveClick(item.group_id)}
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