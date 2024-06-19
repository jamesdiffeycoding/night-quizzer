# quizzer


# project setup
terminal command: npx create-next-app -e with-supabase

# terminal commands
inside the my-app directory
npm run build: builds the app for production
npm start: runs the built app in production mode
npm run dev: runs in local


# useful tools 
Supabase table editor

Example query:
"create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');"


# example login check
check out the protected / page.tsx folder file for an example login-check


# example SQL like commands


# query data from Next JS
server side------------------------------------------------
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}

client side------------------------------------------------
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}