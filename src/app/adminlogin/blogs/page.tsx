import { getAllBlogs } from "@/lib/blogs";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminBlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">Manage <span className="text-primary">Blogs</span></h1>
                    <p className="text-slate-400 mt-1">Create and edit articles for your blog.</p>
                </div>
                <Link href="/adminlogin/blogs/new">
                    <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2 h-11 px-6 font-bold uppercase italic tracking-tighter transition-transform hover:scale-105 active:scale-95">
                        <Plus className="w-5 h-5" /> New Article
                    </Button>
                </Link>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Title</th>
                                <th className="hidden md:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Category</th>
                                <th className="hidden md:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Date</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {blog.is_published ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                <Eye className="w-3 h-3" /> Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                <EyeOff className="w-3 h-3" /> Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {blog.image ? (
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                                                    <img src={blog.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                                                    <BookOpen className="w-6 h-6 text-slate-600" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-100 line-clamp-1 text-base">{blog.title}</p>
                                                <p className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-wider uppercase">/{blog.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                        <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 uppercase tracking-widest border border-slate-700">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/adminlogin/blogs/${blog.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90">
                                                    <Edit className="w-4.5 h-4.5" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90">
                                                <Trash2 className="w-4.5 h-4.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-32 text-center">
                                        <div className="bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                                            <BookOpen className="w-10 h-10 text-slate-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-300 tracking-tight">No articles found</h3>
                                        <p className="text-slate-500 mt-2 max-w-xs mx-auto">Click "New Article" to start sharing your thoughts with your audience.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
