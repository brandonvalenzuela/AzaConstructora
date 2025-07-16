import { BlogEditor } from "@/components/admin/blog-editor"
import { AdminLayout } from "@/components/admin/admin-layout"

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return (
    <AdminLayout>
      <BlogEditor postId={params.id} />
    </AdminLayout>
  )
}
