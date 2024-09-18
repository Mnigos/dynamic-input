import { useRef, type KeyboardEvent } from 'react'
import { createRoot } from 'react-dom/client'

import { Tag } from '@app/components/ui/tag'
import { Button } from '@app/components/ui/button'

const tagList = [
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind',
  'CSS',
  'HTML',
  'Vite',
  'v0',
]

function removeTag(tagId: string) {
  const tagElement = document.querySelector(`#${tagId}`)

  if (tagElement) tagElement.remove()
}

export function DynamicInput() {
  const inputReference = useRef<HTMLDivElement>(null)
  const tagListReference = useRef<HTMLDivElement>(null)

  function insertTag(tag: string) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      inputReference.current?.focus()

      return
    }

    const range = selection.getRangeAt(0)

    if (!inputReference.current?.contains(range.commonAncestorContainer)) {
      inputReference.current?.focus()

      insertTag(tag)
      return
    }

    const tagId = Math.random().toString(36).slice(2, 9)

    const tagElement = document.createElement('span')
    createRoot(tagElement).render(
      <Tag id={tagId} text={tag} onRemove={removeTag} />
    )

    range.deleteContents()
    range.insertNode(tagElement)

    range.setStartAfter(tagElement)
    range.setEndAfter(tagElement)
    selection.removeAllRanges()
    selection.addRange(range)

    inputReference.current.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Backspace') {
      const selection = window.getSelection()

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)

        if (
          range.startOffset === 0 &&
          range.startContainer == inputReference.current
        ) {
          const { lastChild } = inputReference.current

          if (
            lastChild &&
            lastChild.nodeType === Node.ELEMENT_NODE &&
            // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/44253
            Object.hasOwn(lastChild, 'tag')
          ) {
            event.preventDefault()
            lastChild.remove()
          }
        }
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
      <div className="relative">
        <div
          ref={inputReference}
          contentEditable
          onKeyDown={handleKeyDown}
          className="border-input focus-visible:ring-ring border-primary bg-background min-h-[100px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-md border p-2 text-neutral-50 focus-visible:outline-none focus-visible:ring-2"
          style={{ width: '500px', maxWidth: '100%' }}
          aria-label="Dynamic input field"
          role="textbox"
          tabIndex={0}
        />
      </div>

      <div ref={tagListReference} className="flex flex-wrap gap-2">
        {tagList.map(tag => (
          <Button
            key={tag}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              insertTag(tag)
            }}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}
