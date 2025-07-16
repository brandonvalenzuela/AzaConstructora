import { BlogManager } from "@/components/admin/blog-manager"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminBlogPage() {
  return (
    <AdminLayout>
      <BlogManager />
    </AdminLayout>
  )
}
