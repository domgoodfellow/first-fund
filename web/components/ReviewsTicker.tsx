'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

// TODO: Replace with live data from Google Places API
// GET https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews&key=YOUR_API_KEY
const GOOGLE_REVIEWS = [
  { name: 'Michael T.', rating: 5, text: 'Got funded in under 24 hours. Absolutely incredible service.' },
  { name: 'Priya K.', rating: 5, text: 'The team was transparent and fast. No hidden fees, just results.' },
  { name: 'Carlos M.', rating: 5, text: "Way better than any bank I've tried. Simple process, fast money." },
  { name: 'Jennifer L.', rating: 5, text: 'Used them twice now. Same great experience both times.' },
  { name: 'Ahmed R.', rating: 5, text: "Funded my restaurant expansion. Couldn't have done it without them." },
  { name: 'Sophie B.', rating: 5, text: 'Approuvé en 24h, fonds reçus le lendemain. Parfait!' },
  { name: 'David W.', rating: 5, text: 'No collateral, no stress. Exactly what they promised.' },
  { name: 'Natasha P.', rating: 5, text: 'Best business decision I made — highly recommend FirsFund.' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-ff-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

// Duplicate reviews so the infinite scroll loop is seamless
const ITEMS = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS]

export default function ReviewsTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-ff-surface/80 backdrop-blur-md border-b border-ff-border overflow-hidden">
      {/* Google branding pill */}
      <div className="relative flex items-center gap-2">
        <div className="shrink-0 flex items-center gap-1.5 pl-4 pr-3 py-2 border-r border-ff-border bg-ff-surface z-10">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-white text-xs font-semibold">Reviews</span>
          <div className="flex items-center gap-0.5">
            <StarRating rating={5} />
          </div>
        </div>

        {/* Scrolling track */}
        <div className="overflow-hidden flex-1">
          <motion.div
            ref={trackRef}
            className="flex gap-6 py-2 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {ITEMS.map((review, idx) => (
              <div
                key={idx}
                className="shrink-0 flex items-center gap-2 text-xs"
              >
                <StarRating rating={review.rating} />
                <span className="text-white font-medium">{review.name}:</span>
                <span className="text-ff-muted max-w-[220px] truncate">"{review.text}"</span>
                {idx < ITEMS.length - 1 && <span className="text-ff-border ml-2">·</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
