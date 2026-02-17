'use client'

import type { ReactNode } from 'react'
import { Children, isValidElement, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

interface StepContextValue {
  index: number
  isLast: boolean
}

const StepContext = createContext<StepContextValue>({ index: 0, isLast: false })

interface StepProps {
  title: string
  children: ReactNode
  className?: string
}

interface StepsProps {
  children: ReactNode
  className?: string
}

export function Step({ title, children, className }: StepProps) {
  const { index, isLast } = useContext(StepContext)

  return (
    <div className={cn('relative flex gap-6', className)}>
      {/* Number column with connector line */}
      <div className="flex flex-col items-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground/70">
          {index + 1}
        </span>
        {!isLast && (
          <div className="w-px flex-1 bg-border" />
        )}
      </div>

      {/* Content column */}
      <div className={cn('flex-1 pb-10', isLast && 'pb-0')}>
        <h3 className="mt-1 text-base font-semibold text-foreground">
          {title}
        </h3>
        <div className="mt-3 text-sm text-foreground/80 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-2 [&_li]:my-1 [&>p]:my-2 [&>p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Steps({ children, className }: StepsProps) {
  const validChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && (child.props as Record<string, unknown>).title !== undefined,
  )
  const total = validChildren.length

  let stepIndex = 0

  return (
    <div className={cn('relative my-8', className)}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null
        const props = child.props as Record<string, unknown>
        if (props.title === undefined) return null

        const currentIndex = stepIndex
        stepIndex++

        return (
          <StepContext.Provider value={{ index: currentIndex, isLast: currentIndex === total - 1 }}>
            {child}
          </StepContext.Provider>
        )
      })}
    </div>
  )
}

Step.displayName = 'Step'
Steps.displayName = 'Steps'
