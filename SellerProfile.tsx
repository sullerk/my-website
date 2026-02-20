import { Navbar } from "@/components/layout/Navbar";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import { mockSellers, mockStories, mockSellerPosts, Story, SellerPost } from "@/lib/mockData";
import { useRoute, useLocation } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardStack } from "@/components/ui/CardStack";
import { Star, MapPin, Share2, ArrowLeft, Plus, Heart, MessageCircle, X, Image, FileText, Bell, ShieldCheck, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star as StarIcon } from "lucide-react";

interface StoryCircleProps {
  story: Story;
  onClick: () => void;
}

function StoryCircle({ story, onClick }: StoryCircleProps) {
  const getIcon = () => {
    switch (story.type) {
      case 'image':
        return <Image size={16} />;
      case 'text':
        return <FileText size={16} />;
      case 'update':
        return <Bell size={16} />;
    }
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 min-w-[70px]"
    >
      <div className={`relative p-[3px] rounded-full ${story.viewed ? 'bg-gray-800' : 'bg-gradient-to-tr from-[#AC0808] to-orange-500 shadow-[0_0_15px_rgba(172,8,8,0.4)]'}`}>
        <div className="w-16 h-16 rounded-full bg-[#15171a] flex items-center justify-center overflow-hidden border-2 border-[#050505]">
          {story.image ? (
            <img src={story.image} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          ) : (
            <div className="text-gray-400 group-hover:text-white transition-colors">
              {getIcon()}
            </div>
          )}
        </div>
        {!story.viewed && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#AC0808] rounded-full border-2 border-[#050505] animate-pulse" />
        )}
      </div>
      <span className="text-[10px] font-medium text-gray-400 truncate max-w-[60px] group-hover:text-white transition-colors">
        {story.type === 'image' ? 'Photo' : story.type === 'text' ? 'Update' : 'News'}
      </span>
    </motion.button>
  );
}

function AddStoryButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 min-w-[70px] group"
    >
      <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-gray-800 to-gray-700">
        <div className="w-16 h-16 rounded-full bg-[#15171a] flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-[#AC0808] transition-colors">
          <Plus size={24} className="text-gray-400 group-hover:text-[#AC0808] transition-colors" />
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition-colors">Add Story</span>
    </motion.button>
  );
}

interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
}

function StoryModal({ story, onClose }: StoryModalProps) {
  if (!story) return null;

  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#181A1E] border-white/10 text-white max-w-lg p-0 overflow-hidden">
        <div className="relative aspect-[9/16] max-h-[80vh] bg-gradient-to-br from-[#22252b] to-[#15171a]">
          {story.image ? (
            <img src={story.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <p className="text-xl md:text-2xl text-center font-medium leading-relaxed">
                {story.content}
              </p>
            </div>
          )}
          
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AC0808] to-orange-600" />
                <div>
                  <p className="text-sm font-medium">Vault Hunter</p>
                  <p className="text-xs text-gray-400">{story.timestamp}</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {story.image && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm">{story.content}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DiscussionPostProps {
  post: SellerPost;
}

function DiscussionPost({ post }: DiscussionPostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-[#22252b]/50 border border-white/5 hover:border-red-500/20 transition-all"
    >
      <div className="flex gap-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white text-sm">{post.author}</span>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{post.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                liked ? 'text-[#AC0808]' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <Heart size={14} className={liked ? 'fill-current' : ''} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors">
              <MessageCircle size={14} />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SellerProfile() {
  const [match, params] = useRoute("/seller/:id");
  const [, setLocation] = useLocation();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [reviews, setReviews] = useState<{ id: string; author: string; rating: number; content: string; timestamp: string }[]>([
    { id: 'r1', author: 'CardKing99', rating: 5, content: 'Fast shipping and item exactly as described. Trusted seller.', timestamp: '2d ago' },
    { id: 'r2', author: 'SportsVault', rating: 4, content: 'Great communication and fair pricing. Will buy again.', timestamp: '5d ago' },
  ]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!match || !params) return null;

  const seller = mockSellers.find(s => s.id === params.id);

  if (!seller) {
    return <div className="text-white">Seller not found</div>;
  }

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0 relative">
      <Navbar />
      <GalaxyBackground />
      
      <main className="container mx-auto px-4 py-4 md:pt-24 relative z-10">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-400 hover:text-white pl-0 hover:bg-transparent"
          onClick={() => setLocation('/marketplace')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Market
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-[#AC0808] to-orange-600 rounded-full" />
            <h2 className="text-lg font-display font-bold text-white">Stories</h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <AddStoryButton />
            {mockStories.map((story) => (
              <StoryCircle
                key={story.id}
                story={story}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="md:col-span-1 lg:col-span-1 order-1 md:order-1">
            <div className="bg-[#1a1d22] rounded-3xl overflow-hidden border border-white/5 md:sticky md:top-24 shadow-2xl relative">
              {/* Banner Area */}
              <div className="h-32 bg-gradient-to-r from-[#1a0505] to-[#3a0a0a] relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  {/* Abstract Shapes/Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#AC0808] opacity-20 blur-[50px] rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-10 blur-[40px] rounded-full -translate-x-5 translate-y-5 pointer-events-none"></div>
              </div>

              {/* Profile Content */}
              <div className="px-6 pb-6 flex-1 flex flex-col relative">
                  
                  {/* Floating Avatar */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="relative inline-block">
                          <div className="w-24 h-24 rounded-2xl p-1 bg-[#1a1d22] shadow-xl">
                              <Avatar className="w-full h-full rounded-xl border border-white/10">
                                  <AvatarImage src={seller.avatar} alt={seller.name} className="object-cover" />
                                  <AvatarFallback className="rounded-xl bg-red-900/20 text-red-500 font-bold text-2xl">{seller.name[0]}</AvatarFallback>
                              </Avatar>
                          </div>
                          {seller.verified && (
                              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg border-4 border-[#1a1d22]" title="Verified Seller">
                                  <ShieldCheck size={14} fill="currentColor" className="text-white" />
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Info */}
                  <div className="pt-14 text-center mb-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-1 flex items-center justify-center gap-2">
                          {seller.name}
                          <Badge variant="outline" className="bg-[#AC0808]/10 text-[#AC0808] border-[#AC0808]/20 px-2 py-0.5 gap-1 text-[10px]">
                              <Star size={10} className="fill-current" />
                              <span>{seller.rating}</span>
                          </Badge>
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mb-2">{seller.handle}</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          <span>New York, USA</span>
                      </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed text-center mb-6 px-2">
                      {seller.bio || "Specializing in high-end graded basketball slabs and vintage finds."}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/5 py-4 mb-6 bg-white/[0.02] rounded-xl">
                      <div className="px-2 text-center">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Sales</div>
                          <div className="text-sm font-bold text-white">{seller.totalSales?.toLocaleString() || "124"}</div>
                      </div>
                      <div className="px-2 text-center">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Followers</div>
                          <div className="text-sm font-bold text-white">{(seller.totalSales ? seller.totalSales * 12 : 120).toLocaleString()}</div>
                      </div>
                      <div className="px-2 text-center">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Joined</div>
                          <div className="text-sm font-bold text-white">Dec 2023</div>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-[#AC0808] to-orange-600 hover:from-[#8a0606] hover:to-orange-700 text-white font-medium h-10 rounded-xl shadow-lg shadow-red-900/20 transition-all hover:scale-[1.02]">
                          <UserPlus size={16} className="mr-2" /> Follow
                      </Button>
                      <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 h-10 rounded-xl transition-all hover:border-white/20" onClick={() => setMessageOpen(true)}>
                          <MessageCircle size={16} className="mr-2" /> Message
                      </Button>
                  </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 flex flex-col justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] order-2 md:order-2">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white">Collection Highlights</h2>
                <p className="text-gray-500 text-xs sm:text-sm">Swipe cards to browse inventory</p>
              </div>
              <Badge variant="outline" className="border-[#AC0808] text-[#AC0808] text-xs sm:text-sm">
                {seller.items.length} Items
              </Badge>
            </div>
            
            <CardStack items={seller.items} />
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-[#AC0808] to-orange-600 rounded-full" />
            <h2 className="text-xl md:text-2xl font-display font-bold text-white">Discussion Feed</h2>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {mockSellerPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DiscussionPost post={post} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              Load More Posts
            </Button>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-[#AC0808] to-orange-600 rounded-full" />
            <h2 className="text-xl md:text-2xl font-display font-bold text.white">Reviews</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl bg-[#22252b]/50 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{rev.author}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={14} className={i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{rev.content}</p>
                <p className="text-xs text-gray-500 mt-2">{rev.timestamp}</p>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-[#181A1E] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-300">Your Rating</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} onClick={() => setNewReviewRating(i + 1)} className="text-gray-600 hover:text-yellow-400">
                      <StarIcon size={16} className={i < newReviewRating ? "text-yellow-400 fill-yellow-400" : ""} />
                    </button>
                  ))}
                </div>
              </div>
              <Input 
                placeholder="Write a review..."
                className="bg-[#22252b] border-white/10 text-white mb-2"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  className="bg-[#AC0808] hover:bg-[#8a0606] text-white"
                  onClick={() => {
                    if (!newReviewText.trim()) return;
                    setReviews(prev => [
                      { id: Math.random().toString(36).slice(2), author: "You", rating: newReviewRating, content: newReviewText.trim(), timestamp: "now" },
                      ...prev
                    ]);
                    setNewReviewText("");
                    setNewReviewRating(5);
                  }}
                >
                  Send Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedStory && (
          <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}
      </AnimatePresence>
      <Dialog open={messageOpen} onOpenChange={(open) => !open && setMessageOpen(false)}>
        <DialogContent className="bg-[#181A1E] border-white/10 text-white sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Message {seller.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <textarea
              className="w-full min-h-[120px] rounded-md bg-[#22252b] border border-white/10 p-3 text-sm"
              placeholder="Write your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white" onClick={() => { setMessageOpen(false); setMessageText(""); }}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
