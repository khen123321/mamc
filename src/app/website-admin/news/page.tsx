import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { NewsEditorClient } from "@/components/website-admin/news-editor-client";

export default function WebsiteAdminNewsPage() {
  return (
    <WebsiteAdminShell>
      <NewsEditorClient />
    </WebsiteAdminShell>
  );
}
