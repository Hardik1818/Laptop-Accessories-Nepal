import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogBySlug } from "@/lib/blogs";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const readTime = Math.ceil(post.content.split(' ').length / 200) + " min read";

    return (
        <div className="bg-background min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
                </Link>

                <article className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                {post.author || 'Admin'}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                {readTime}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                            {post.title}
                        </h1>

                        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-muted">
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-primary/20" />
                                </div>
                            )}
                        </div>
                    </header>

                    <div
                        className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none 
                        prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
                        prose-p:text-muted-foreground prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <footer className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-foreground">Share this story:</p>
                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" className="rounded-full shadow-sm">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}
