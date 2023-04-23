import React, { useRef } from 'react'

import { ButtonProps } from './Button.ui'
import { Button } from './index'

/**
 * Upload file logic
 */
const handleChange = (action: ButtonProps['action']) =>
  async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files !== null &&
      event.target?.files?.length > 0
    ) {
      const file = event.target.files[0]

      if (file?.type?.startsWith("video/")) {

        action && action(file)
      }
    }
  }

/**
 * Component Wrapper for uploading files
 */
export const UploadButton = ({ action, ...props }: ButtonProps) => {

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <input
        accept={'video/*'}
        onChange={handleChange(action)}
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
      />
      <Button {...props}
        action={() => inputRef.current?.click()}
      />
    </>
  )
}

UploadButton.defaultProps = {
  ...Button.defaultProps
}