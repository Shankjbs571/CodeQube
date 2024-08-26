import { React, useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faBug, faShieldAlt, faCode, faChartBar, faListOl, faFileCode, faTachometerAlt, faDollarSign, faCog, faFileAlt, faLanguage, faTag } from '@fortawesome/free-solid-svg-icons';


const Analyze = () => {
    const [repoLink, setRepoLink] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [searchingRepo, setSearchingRepo] = useState(false);
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analysisError, setAnalysisError] = useState(false);
    const [fetchReport, setFetchReport] = useState("dontfetch");
    const [reportData, setReportData] = useState({
        component: {
            key: '',
            name: '',
            qualifier: '',
            measures: [
                { metric: 'duplicated_lines_density', value: 'N/A', bestValue: false },
                { metric: 'vulnerabilities', value: 'N/A', bestValue: false },
                { metric: 'code_smells', value: 'N/A', bestValue: false },
                { metric: 'bugs', value: 'N/A', bestValue: false },
                { metric: 'coverage', value: 'N/A', bestValue: false },
            ],
        },
    });

    const getreport = async () => {
        try {
            const repoName = repoLink.split('/').pop();
            const response = await axiosInstance.post('/report/getreport', { componentKey: repoName });
            console.log("Response data:", response.data);
            return response.data?.report;
        } catch (error) {
            console.log("Error:", error);
            return null; // Return null in case of an error
        }
    };

    useEffect(() => {
        const fetchReportData = async () => {
            if (repoLink) {
                const report = await getreport();
                if (report) {
                    setReportData(report);
                }
            }
        };
        fetchReportData();
    }, [fetchReport]);

    const validateGitHubLink = (url) => {
        const gitHubRepoRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
        return gitHubRepoRegex.test(url);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setRepoLink(inputValue);

        // Validate the input
        setIsValid(validateGitHubLink(inputValue));
    };

    const handleAnalyze = async () => {
        setSearchingRepo(true);
        setAnalysisDone(false);
        try {
            const repoName = repoLink.split('/').pop();
            const res = await axiosInstance.post('/repo/clonerepo', { repoLink: repoLink });
            console.log(res);
            setSearchingRepo(false);
            setAnalysisDone(true);
            setFetchReport("fetchit")
        } catch (error) {
            console.log("Error:", error);
            setSearchingRepo(false);
            setAnalysisDone(false);
            setAnalysisError(true);
        }
    };

    const formatMetric = (metric) => {
        switch (metric) {
            case 'coverage':
                return 'Code Coverage';
            case 'bugs':
                return 'Bugs';
            case 'vulnerabilities':
                return 'Security Vulnerabilities';
            case 'code_smells':
                return 'Code Smells';
            case 'duplicated_lines_density':
                return 'Duplicated Lines Density';
            case 'lines':
                return 'Total Lines of Code';
            case 'file_complexity':
                return 'File Complexity';
            case 'security_rating':
                return 'Security Rating';
            case 'reliability_rating':
                return 'Reliability Rating';
            case 'major_violations':
                return 'Major Violations';
            case 'ncloc_language_distribution':
                return 'Lines of Code by Language';
            case 'complexity':
                return 'Code Complexity';
            case 'development_cost':
                return 'Development Cost';
            case 'files':
                return 'Total Files';
            case 'ncloc':
                return 'Lines of Code';
            default:
                return metric.replace(/_/g, ' ').toUpperCase();
        }
    };

    const getIconForMetric = (metric) => {
        switch (metric) {
            case 'coverage':
                return faChartBar;
            case 'bugs':
                return faBug;
            case 'vulnerabilities':
                return faShieldAlt;
            case 'code_smells':
                return faCode;
            case 'duplicated_lines_density':
                return faListOl;
            case 'lines':
                return faFileCode;
            case 'file_complexity':
                return faCog;
            case 'security_rating':
                return faShieldAlt;
            case 'reliability_rating':
                return faTachometerAlt;
            case 'major_violations':
                return faTag;
            case 'ncloc_language_distribution':
                return faLanguage;
            case 'complexity':
                return faChartBar;
            case 'development_cost':
                return faDollarSign;
            case 'files':
                return faFileAlt;
            case 'ncloc':
                return faFile;
            default:
                return null;
        }
    };

    const MetricCard = ({ metricData }) => (
        <div key={metricData.metric} className="p-4 border rounded-lg flex items-center space-x-3">
            {getIconForMetric(metricData.metric) && (
                <FontAwesomeIcon icon={getIconForMetric(metricData.metric)} className="text-gray-500" />
            )}
            <div>
                <h3 className="text-lg font-medium">{formatMetric(metricData.metric)}</h3>
                <p className="text-sm">Value: {metricData.value}</p>
                <p className="text-sm">Best Value: {metricData.bestValue ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
    
    

    return (
        <div className="bg-black flex flex-col h-screen justify-between">
            <div
                className="fixed inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#61c87e] to-[#7069d2] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mt-20 pb-14 flex z-40 flex-col justify-center items-center sm:pt-16 lg:pt-24 lg:pb-24">
                <div className="container border border-slate-200 rounded-full bg-black p-2 flex justify-between items-center fixed top-20 max-w-screen-xl text-gray-600">
                    <div className='w-full'>
                        <input
                            type="search"
                            name="search"
                            placeholder="Github Repository link...."
                            onChange={handleChange}
                            value={repoLink}
                            className={`bg-white w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none ${isValid ? '' : 'border-red-500'}`}
                        />
                    </div>
                    {repoLink !== '' && (
                        !isValid ? (
                            <div className="bg-red-400 w-fit rounded-full px-4 py-2 text-white my-auto h-fit m-2">
                                Invalid
                            </div>
                        ) : (
                            <div
                                className="bg-blue-700 w-fit hover:bg-blue-600 hover:scale-[1.02] rounded-full px-4 py-2 text-white my-auto h-fit m-2"
                                onClick={handleAnalyze}
                            >
                                Analyze
                            </div>
                        )
                    )}
                </div>

                <div className="container flex gap-2 rounded-lg overflow-hidden max-w-screen-xl">
                    <div className="bg-white flex flex-col p-4 text-black items-center w-[20%] min-h-[70vh]">
                        {searchingRepo && (
                            <div className="flex flex-col justify-center mb-4">
                                <div className="flex justify-center space-x-2 animate-pulse">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                </div>
                                <div className="flex mt-2 flex-col justify-center items-center space-x-2 animate-pulse" >
                                    <div className="flex flex-col justify-center items-center bg-amber-100 rounded-lg p-4 mb-4 text-sm text-zinc-400" role="alert">
                                        {/* <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg> */}
                                        
                                        {/* <div className="font-medium">......Processing.....</div> */}
                                        <div> Sit back! We are scanning your GitHub repo, It may take about 28 mins depending on your Repo Size </div>

                                        
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                        {analysisDone && <Alert title={"Success! "} message={"Analysis complete, we are loading the results"} />}
                        {analysisError && (
                            <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                                <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                <div>
                                    <span className="font-medium">Something went wrong!</span> Server may be down.
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white text-black flex-1">
                        <div className="p-4 space-y-4">
                            <div className="shadow-md rounded-lg p-4">
                                <h2 className="text-xl font-semibold mb-4">{reportData.component?.key || 'Repository Name'}</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {reportData.component?.measures.map((measure, index) => (
                                        <MetricCard key={index} metricData={measure} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                aria-hidden="true"
            >
                <svg
                    className="relative -z-10 max-w-none -translate-x-1/2 rotate-[30deg] -translate-y-8"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="url(#c63bc0b5-5939-4d1d-b91a-2efba71e5d8f)"
                        fillOpacity=".3"
                        d="M317.5 196L307.8 204.2C297.4 212.4 274.1 220.6 246.6 224.5C219.1 228.4 188.8 227.9 160.2 214.7C131.7 201.5 105.4 175.1 89.8 143.8C74.3 112.4 69.1 76.9 79.3 44.4C89.4 11.9 114.8 -16.7 144.6 -33.8C174.5 -51 208.6 -53.1 237.2 -40.1C265.7 -27.2 289.1 -1.5 307.5 27.6C325.8 56.8 327.4 90.7 317.5 196Z"
                    />
                    <defs>
                        <linearGradient
                            id="c63bc0b5-5939-4d1d-b91a-2efba71e5d8f"
                            x1="0%"
                            x2="100%"
                            y1="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.3)" />
                            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.3)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default Analyze;
