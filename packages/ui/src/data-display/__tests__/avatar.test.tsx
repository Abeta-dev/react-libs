import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '../avatar';

describe('Avatar component suite', () => {
  it('renders avatar fallback with provided initials', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies avatar size variants correctly', () => {
    const { container: smContainer } = render(
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
    );
    const smAvatar = smContainer.firstChild as HTMLElement;
    expect(smAvatar.className).toContain('h-8');
    expect(smAvatar.className).toContain('w-8');

    const { container: lgContainer } = render(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    const lgAvatar = lgContainer.firstChild as HTMLElement;
    expect(lgAvatar.className).toContain('h-14');
    expect(lgAvatar.className).toContain('w-14');
  });

  it('renders AvatarGroup and displays overflow counter when count exceeds max', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );

    expect(screen.getByText('U1')).toBeInTheDocument();
    expect(screen.getByText('U2')).toBeInTheDocument();
    expect(screen.queryByText('U3')).not.toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('forwards ref on Avatar root', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>RF</AvatarFallback>
      </Avatar>
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
