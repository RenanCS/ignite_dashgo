import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('ActiveLink component', () => {

    it('renders correctly', () => {
        const { getByText } = render(
            <ActiveLink href="/" >
                <a>Home</a>
            </ActiveLink>
        )

        expect(getByText('Home')).toBeInTheDocument();
    });


    it('add attribute pink 400 with active', () => {
        const { getByText } = render(
            <ActiveLink href="/" >
                <a>Home</a>
            </ActiveLink>
        )

        expect(getByText('Home')).toHaveAttribute("color", 'pink.400');
    });

});