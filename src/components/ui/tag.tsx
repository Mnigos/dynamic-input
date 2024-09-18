import { X } from 'lucide-react'

import { Button } from '@app/components/ui/button'

namespace Tag {
  export type Props = Readonly<{
    id: string
    text: string
    onRemove: (id: string) => void
  }>
}

function Tag({ id, text, onRemove }: Tag.Props) {
  return (
    <span
      className="bg-primary/10 text-primary mr-1 inline-flex items-center rounded-full px-2 py-1 text-sm"
      contentEditable={false}
      id={id}
    >
      {text}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary/80 z-10 ml-1 h-4 w-4 p-0"
        onClick={() => {
          onRemove(id)
        }}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove {text} tag</span>
      </Button>
    </span>
  )
}

export { Tag }
