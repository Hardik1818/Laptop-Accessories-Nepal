import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, User, BookOpen } from "lucide-react";
import { getPublishedBlogs } from "@/lib/blogs";

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
    const blogs = await getPublishedBlogs();

    return (
        <div className="bg-background min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <header className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Blog</span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-6">
                        The Tech <span className="text-primary">Blog</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Stay updated with the latest in tech, tips for laptop maintenance, and expert insights from our workshop.
                    </p>
                </header>

                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {blogs.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-card border border-border/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BookOpen className="w-12 h-12 text-primary/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                                            {post.category || 'Article'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" />
                                            {post.author || 'Admin'}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black tracking-tighter uppercase mb-4 group-hover:text-primary transition-colors leading-[1.1]">
                                        {post.title}
                                    </h2>

                                    <p className="text-muted-foreground line-clamp-3 mb-8 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                                        Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-muted-foreground">No posts yet. Check back soon!</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
