import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  align?: string
  color?: number
}

const Label: React.FC<LabelProps> = ({ text, align, color=0 }) => (
  !color ? 
  (<StyledLabel>{text}</StyledLabel>) :
  (<StyledBrightLabel>{text}</StyledBrightLabel>)
)

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
`

const StyledBrightLabel = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
`

export default Label
