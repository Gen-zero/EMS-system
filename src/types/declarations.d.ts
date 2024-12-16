declare module 'lucide-react' {
    import * as React from 'react';
  
    // Define props for the icons
    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: string | number; // Allow size to be a string or number
    }
  
    // Declare generic export for all icons
    export const *: React.FC<IconProps>;
  }
  