'use client';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useState } from 'react';

export default function EmojiPicker(
  { hidePicker,
    content,
    setContent,
    formData
  }:
  {
    hidePicker: Function,
    content: string,
    setContent: Function,
    formData: FormData
  }
) {
  const [emoji, setEmoji] = useState({native: ''});

  useEffect(() => {
    setContent((prev: string) => prev += emoji.native);
    formData.set('content', content + emoji.native);
  }, [emoji]);

  return (
    <div className='absolute top-12 -left-28 z-50 sm:left-8'>
      <Picker
          data={data}
          onEmojiSelect={setEmoji}
          onClickOutside={hidePicker}
      />
    </div>
  )
}
