import { BlogEditor } from "@/components/admin/blog-editor"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function NewBlogPostPage() {
  return (
    <AdminLayout>
      <BlogEditor />
    </AdminLayout>
  )
}
