import React, { useRef } from 'react'

import { Button, ButtonProps } from './Button.ui'

/**
 * Upload file logic
 */
const handleChange = (action: ButtonProps['action']) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files !== null &&
      event.target?.files?.length > 0
    ) {
      action && action(event)
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