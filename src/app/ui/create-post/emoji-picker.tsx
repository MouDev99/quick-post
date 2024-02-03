'use client';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useState } from 'react';

export default function EmojiPicker(
  { hidePicker, setContent }:
  {
    hidePicker: Function,
    setContent: Function
  }
) {
  const [emoji, setEmoji] = useState({native: ''});

  useEffect(() => {
    setContent((prev: string) => prev += emoji.native);
  }, [emoji]);

  return (
    <div className='absolute top-12 -left-28 sm:left-8'>
      <Picker
          data={data}
          onEmojiSelect={setEmoji}
          onClickOutside={hidePicker}
      />
    </div>
  )
}
