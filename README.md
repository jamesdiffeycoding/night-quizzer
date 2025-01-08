# Night Quizzer


## Inspiration
Many online quiz sites are overly bright, ad-filled, and overstimulating for people with light sensitivity.

## What it does
Night Quizzer aims to provide all the features required for an individual wanting to create and share their own quizzes, as well as use those already created by others.
 
## List of app features 
* Users can play publicly available quizzes whether logged in or not
* Users can sign up and create their own quizzes, setting them to public or private

## How we built it
Next JS, React, Supabase

## What's next?
I need to fix the inconsistencies I've noticed with the auth mechanism on the clientside I need to debug. Alongside this, I want to improve testing for this site.

<<<<<<< HEAD

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
=======
# Dev notes
This project was setup with "npx create-next-app -e with-supabase" (terminal command). Inside the my-app directory, "npm run build" builds the app for production, "npm start" runs the built app in production mode, and "npm run dev": runs the project locally. Supabase's table editor is a particularly useful tool.
>>>>>>> 1f8df497cc98c5f0edd6869abbf67a4cca371ed9
