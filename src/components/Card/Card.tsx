import { HTMLAttributes } from "react";
import "./Card.css";
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type CardBackground = "dark" | "light" | "none" | "orange" | "gradient";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: CardBackground;
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: CardBackground;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: CardBackground;
}

const Header = ({ children, background = "dark", ...props }: HeaderProps) => {
  return (
    <div className={`card-title bg-${background}`} {...props}>
      {children}
    </div>
  );
};

const Body = ({ children, background = "none", ...props }: BodyProps) => {
  return (
    <div className={`card-body bg-${background}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({
  children,
  background = "none",
  ...props
}: FooterProps): JSX.Element => {
  return (
    <div className={`card-footer bg-${background}`} {...props}>
      {children}
    </div>
  );
};

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <div className={`card`} {...props}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
