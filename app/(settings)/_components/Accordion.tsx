import {AccordionItem} from "@/app/(settings)/_components/AccordionItem";

export function Accordion() {
    const accordionItemsData = [
        {
            title: 'Introduction',
            content: (
                <>
                    <p>This is the introduction section. It provides a general overview of the topic. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Overview point one.</li>
                        <li>Overview point two.</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Mission and Vision',
            content: (
                <p>Our mission is to deliver exceptional value, and our vision is to lead the industry through
                    innovation and commitment. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.</p>
            ),
            initiallyOpen: false, // Example: keep this one closed initially
        },
        {
            title: 'Privacy and Security',
            content: (
                <>
                    <p>We are committed to protecting your privacy and ensuring the security of your data. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident.</p>
                    <p className="mt-2">For more details, please review our full <a href="#"
                                                                                    className="text-indigo-600 hover:underline">Privacy
                        Policy</a>.</p>
                </>
            ),
        },
        {
            title: 'Version 1.0',
            content: (
                <>
                    <p>This marks the first major release of our product, Version 1.0. Sunt in culpa qui officia
                        deserunt mollit anim id est laborum.</p>
                    <p className="mt-2">Key features in this version include:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Feature A</li>
                        <li>Feature B</li>
                        <li>Feature C</li>
                    </ul>
                </>
            ),
        },
    ];

    // Effect to apply Inter font to body - typically done in index.html or a global CSS file
    // useEffect(() => {
    //     document.body.style.fontFamily = "'Inter', sans-serif";
    //     // Load the font if not already loaded by other means
    //     const fontLink = document.createElement('link');
    //     fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    //     fontLink.rel = "stylesheet";
    //     document.head.appendChild(fontLink);
    //
    //     return () => {
    //         // Optional: Clean up if App component unmounts, though for body style it's usually persistent
    //         // document.head.removeChild(fontLink);
    //     };
    // }, []);


    return (
        <div className="bg-gray-100 p-4 sm:p-8 flex justify-center items-start min-h-screen">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-md">
                {accordionItemsData.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        initiallyOpen={item.initiallyOpen !== undefined ? item.initiallyOpen : index === 0} // Open first item by default if not specified
                    >
                        {item.content}
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
}
