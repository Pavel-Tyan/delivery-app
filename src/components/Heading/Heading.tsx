import { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';
import cn from 'classnames';

const Heading = ({ children, className }: HeadingProps) => {
    return <h1 className={cn(className, styles.h1)}>{children}</h1>;
};

export default Heading;
