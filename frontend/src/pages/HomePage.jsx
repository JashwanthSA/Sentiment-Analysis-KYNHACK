
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
 
      <header className="bg-red-500 text-white py-4 text-center text-2xl font-bold">
        Reddit Dynamic Dashboard
      </header>

   
      <main className="flex-grow px-8 py-12">
        <section className="bg-white rounded-xl shadow-lg p-8 text-gray-800 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome to MENtion</h1>
          <p className="text-lg text-center mb-8">
            Harness the power of Reddit for real-time analysis and dynamic dashboards.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
     
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">Sentiment Analysis</h2>
              <p className="text-sm text-gray-600">
                Visualize post and comment sentiment using pie charts, bar charts, and line charts.
              </p>
            </div>
     
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">Real-time Reddit Data</h2>
              <p className="text-sm text-gray-600">
                Analyze live Reddit data to extract keywords, sentiment trends, and trending topics.
              </p>
            </div>

            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">Keyword Extraction</h2>
              <p className="text-sm text-gray-600">
                Use RAKE to identify topics from posts and comments for efficient analysis.
              </p>
            </div>
            
       
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">Trend Analysis</h2>
              <p className="text-sm text-gray-600">
                Discover trending topics in real-time to stay ahead of Reddit trends.
              </p>
            </div>
          </div>

   
          <div className="text-center mt-8">
            <Link
              to="/project"
              className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition"
            >
              Explore the Dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-red-500 text-white w-full h-24 text-center py-8 rounded-xl font-bold fixed bottom-0 left-0">
        Team MENtion &copy; 2024 | KYN-HACK
        <hr className="w-5/12 mx-auto" />
        <div>Madhavan | Jashwanth | Murali S</div>
      </footer>
    </div>
  );
};

export default HomePage;
