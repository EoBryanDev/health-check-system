"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GroupCCSection } from "@/components/group-cc-section"
import { JobCCSection } from "@/components/job-cc-section"
import { ServiceCCSection } from "@/components/service-cc-section"


export function CommandCenterMain() {
  const [activeTab, setActiveTab] = useState("group")

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Command Center</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Centralized control panel for managing and executing operations across groups, jobs, and services. Monitor
          execution status, manage resources, and control system operations from a unified interface.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Button
          variant={activeTab === "group" ? "default" : "outline"}
          onClick={() => setActiveTab("group")}
          className="w-full sm:w-auto"
        >
          RUN BY GROUP
        </Button>
        <Button
          variant={activeTab === "job" ? "default" : "outline"}
          onClick={() => setActiveTab("job")}
          className="w-full sm:w-auto"
        >
          RUN BY JOB
        </Button>
        <Button
          variant={activeTab === "service" ? "default" : "outline"}
          onClick={() => setActiveTab("service")}
          className="w-full sm:w-auto"
        >
          RUN BY SERVICE
        </Button>
      </div>

      {activeTab === "group" && <GroupCCSection />}
      {activeTab === "job" && <JobCCSection />}
      {activeTab === "service" && <ServiceCCSection />}
    </div>
  )
}
