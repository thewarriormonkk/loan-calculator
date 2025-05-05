const About = () => {
    return (
        <div className="home">
            <h1>About This App</h1>
            <p>The Loan Calculator App is a modern, responsive single-page application built with React JS and Material UI. It allows users to calculate loan EMIs using standard formulas, view monthly amortization schedules, and see real-time currency conversions via the ExchangeRate API. The app supports both light and dark modes, handles errors gracefully, and provides a seamless user experience across all devices.</p>
            <h2>Features</h2>
            <ul>
                <li>Loan EMI calculation using standard formulas</li>
                <li>Monthly amortization breakdown</li>
                <li>Real-time EMI currency conversion using live exchange rates</li>
                <li>Paginated exchange rate table for 160+ currencies</li>
                <li>Dark/Light mode toggle</li>
                <li>Collapsible mobile navigation</li>
                <li>Fully responsive UI with Material UI</li>
            </ul>
            <h2>Tech Stack</h2>
            <ul>
                <li>React JS (Hooks, Routing, Context API)</li>
                <li>Material UI for design and responsiveness</li>
                <li>Axios for API requests</li>
                <li>ExchangeRate API for live currency conversion</li>
            </ul>
        </div>
    );
}
 
export default About;