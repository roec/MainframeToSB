import { useMemo, useState } from "react";
import { AppHeader } from "../components/layout/AppHeader";
import { MainShell } from "../components/layout/MainShell";
import { CobolEditor } from "../components/input/CobolEditor";
import { SourceActionBar } from "../components/input/SourceActionBar";
import { ProgressSummary } from "../components/pipeline/ProgressSummary";
import { StageTimeline } from "../components/pipeline/StageTimeline";
import { AgentPipeline } from "../components/pipeline/AgentPipeline";
import { LiveLogPanel } from "../components/pipeline/LiveLogPanel";
import { IRTabPanel } from "../components/ir/IRTabPanel";
import { ProjectTree } from "../components/project/ProjectTree";
import { FileViewer } from "../components/project/FileViewer";
import { DownloadPanel } from "../components/project/DownloadPanel";
import { AuditLogPanel } from "../components/audit/AuditLogPanel";
import { useMigrationStore } from "../store/migrationStore";
import { sampleCobol } from "../data/sampleCobol";
import { useMigrationRunner } from "../hooks/useMigrationRunner";

const tabs = ["Pipeline", "IR Viewer", "Project Tree", "File Viewer", "Audit Logs"] as const;

export const HomePage = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Pipeline");
  const store = useMigrationStore();
  const { run } = useMigrationRunner();
  const selectedFile = useMemo(() => store.generatedFiles.find((f) => f.path === store.selectedFilePath), [store.generatedFiles, store.selectedFilePath]);

  return (
    <MainShell>
      <AppHeader status={store.status} />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-3">
          <SourceActionBar onLoadSample={() => store.setSourceCode(sampleCobol)} onClear={() => store.setSourceCode("")} onRun={run} onLoadFile={store.setSourceCode} />
          <CobolEditor value={store.sourceCode} onChange={store.setSourceCode} />
          {store.error && <div className="bg-red-950 border border-red-700 rounded p-2 text-sm">{store.error}</div>}
        </div>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">{tabs.map((t) => <button key={t} className={`px-3 py-1 border rounded ${tab === t ? "bg-slate-700" : ""}`} onClick={() => setTab(t)}>{t}</button>)}</div>
          {tab === "Pipeline" && <div className="space-y-3"><ProgressSummary progress={store.progress} stage={store.currentStage} /><StageTimeline current={store.currentStage} /><AgentPipeline steps={store.agentSteps} /><LiveLogPanel logs={store.auditLogs} /></div>}
          {tab === "IR Viewer" && <IRTabPanel ir={store.ir} />}
          {tab === "Project Tree" && <ProjectTree files={store.generatedFiles} onSelect={store.selectFile} />}
          {tab === "File Viewer" && <FileViewer file={selectedFile} />}
          {tab === "Audit Logs" && <AuditLogPanel logs={store.auditLogs} />}
          <DownloadPanel sessionId={store.sessionId} enabled={store.status === "completed"} />
        </div>
      </div>
    </MainShell>
  );
};
