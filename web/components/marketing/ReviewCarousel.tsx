'use client'

import { useState } from 'react'

interface Review {
  id: number
  name: string
  title?: string
  rating: number
  date: string
  content: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Anthony Balmir',
    title: '9 reviews',
    date: '3 months ago',
    rating: 5,
    content:
      'Will was extremely knowledgeable and transparent throughout the entire funding process. He took the time to explain every option clearly and structured a solution that actually made sense for my business. Fast, responsive, and honest — highly recommend.',
  },
  {
    id: 2,
    name: 'Jonathan Cyr',
    title: 'Local Guide · 26 reviews',
    date: '5 months ago',
    rating: 5,
    content: 'Amazing evening well organized looking forward to next events!!',
  },
  {
    id: 5,
    name: 'Tiago',
    title: '11 reviews · 1 photo',
    date: '3 months ago',
    rating: 5,
    content:
      'Will genuinely cared about finding the right solution, not just closing a deal. He was honest about expectations, timelines, and costs, which made a big difference. Great experience overall.',
  },
  {
    id: 8,
    name: 'Bethany Brassard',
    title: '1 review',
    date: '3 months ago',
    rating: 5,
    content:
      'Will made the process simple and stress-free. Straightforward, professional, and always available. Would absolutely work with him again.',
  },
  {
    id: 10,
    name: 'Argiris Vamvas',
    title: '5 reviews',
    date: '5 months ago',
    rating: 5,
    content:
      'FirstFund possesses deep knowledge of the market and clearly explained all my options, ensuring I understood the pros and cons of each choice. I felt confident that the strategy we chose was genuinely tailored to my specific financial goals.',
  },
  {
    id: 12,
    name: 'Anthony Pace',
    title: 'Local Guide · 19 reviews',
    date: '7 months ago',
    rating: 5,
    content:
      "I had an exceptional experience with FirstFund! They helped me secure business financing incredibly quickly and at a very competitive rate. The process was smooth, straightforward, and professional from start to finish.",
  },
  {
    id: 13,
    name: 'Patrick Elbaz',
    title: '5 reviews',
    date: '5 months ago',
    rating: 5,
    content:
      "I see some mixed reviews here, but I'd like to share that my personal experience with FirstFund was excellent. All the paperwork was completed on time and handled exactly as expected.",
  },
  {
    id: 15,
    name: 'Victoria Konstas',
    title: '1 review',
    date: '5 months ago',
    rating: 5,
    content:
      'Will was absolutely amazing. He had answered all my questions within seconds. Proper funding firm — would suggest to use them.',
  },
]

const TRACK = [...reviews, ...reviews]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCarousel() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-5"
        style={{
          width: 'max-content',
          animation: 'carouselScroll 55s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {TRACK.map((review, idx) => (
          <div
            key={idx}
            className="w-[340px] 3xl:w-[380px] 4xl:w-[420px] shrink-0 bg-ff-bg border border-ff-border rounded-2xl p-6 flex flex-col shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:border-ff-border-blue hover:shadow-[0_4px_16px_rgba(30,64,175,0.08)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Stars count={review.rating} />
              <svg className="w-6 h-6 text-ff-accent/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <p className="text-ff-text text-sm leading-relaxed flex-1 line-clamp-4">
              &ldquo;{review.content}&rdquo;
            </p>

            <div className="mt-5 pt-4 border-t border-ff-border">
              <div className="font-heading font-semibold text-ff-text text-sm">{review.name}</div>
              {review.title && (
                <div className="text-ff-muted text-xs mt-0.5">{review.title}</div>
              )}
              <div className="text-ff-subtle text-xs mt-1">{review.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
