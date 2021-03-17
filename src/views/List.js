import Quick from "quickjs-component";



function List() {
    return (
        <div className="list-main">
        <div className="list-con mt-10">
            <div className="list-1 flex justify-around">
                <div className="list rounded p-3 w-5/12 cursor-pointer max-w-md  border border-gray-200 mt-4">
                    <di className="title">
                        <h1 className="text-xl font-bold text-black flex items-center mt-2">Documentat <span className="ml-2"><svg className="text-black w-6 -mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg></span></h1>
                    </di>
                    <div className="tag">
                        <p className="text-black font-medium mt-2 mb-3">Check out documentation on how to get started and setup your project with Quick.js.</p>
                    </div>
                </div>
                <div className="list rounded shadow-sm p-3 w-5/12 cursor-pointer max-w-md border  border-gray-200 mt-4">
                    <di className="title">
                        <h1 className="text-xl font-bold text-black flex items-center mt-2">Learn <span className="ml-2"><svg className="text-black w-6 -mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg></span></h1>
                    </di>
                    <div className="tag">
                        <p className="text-black font-medium mt-2 mb-3">Learn about Quick.js and it's ecosystem.</p>
                    </div>
                </div>
            </div>
            <div className="list-2 flex justify-around">
                <div className="list rounded shadow-sm p-3 w-5/12 cursor-pointer max-w-md border border-gray-200  mt-4">
                    <di className="title">
                        <h1 className="text-xl font-bold text-black flex items-center mt-2">Examples <span className="ml-2"><svg className="text-black w-6 -mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg></span></h1>
                    </di>
                    <div className="tag">
                        <p className="text-black font-medium mt-2 mb-3">Check out on projects created with Quick.js</p>
                    </div>
                </div>
                <div className="list rounded shadow-sm p-3 w-5/12 max-w-md border cursor-pointer  border-gray-200  mt-4">
                    <di className="title">
                        <h1 className="text-xl font-bold text-black flex items-center mt-2">Deploy <span className="ml-2"><svg className="text-black w-6 -mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg></span></h1>
                    </di>
                    <div className="tag">
                        <p className="text-black font-medium mt-2 mb-3">We'll show you how to deploy your Quick.js application to production.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default List

