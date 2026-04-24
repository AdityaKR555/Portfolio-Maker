import { toPng } from "html-to-image";
import jsPDF from "jspdf";

function Output({ data, theme, setTheme }) {
  //function to download the portfolio as pdf
  const downloadPDF = async () => {
    const element = document.getElementById("preview");

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: theme === "dark" ? "#132A13" : "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;

    // Get actual element dimensions for correct aspect ratio
    const imgHeight =
    (element.offsetHeight * imgWidth) / element.offsetWidth;

    pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("portfolio.pdf");
  };

  return (
    <div className="w-full md:w-1/2 space-y-6 overflow-y-auto min-h-[90vh]">
      <p className="text-2xl text-[#90A955] font-semibold ml-2">
        Live Preview:
      </p>

      <div
        id="preview"
        className={`border p-6 rounded-xl space-y-6 ${
          theme === "dark" ? "bg-[#132A13] text-white" : "bg-white text-black"
        } transition-all duration-500 ease-in`}
      >
        {/* Name + Bio */}
        <div>
          <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
          <p
            className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
          >
            {data.bio || "Your bio will appear here..."}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.length > 0 ? (
              data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-[#90A955] text-black px-3 py-1 rounded-lg font-semibold"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p
                className={`text-gray-400 ${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
              >
                No skills added
              </p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Projects</h2>

          {data.projects.length > 0 ? (
            data.projects.map((project, i) => (
              <div
                key={i}
                className="border border-gray-600 p-4 rounded-lg mb-3"
              >
                <h3 className="text-lg font-bold">
                  {project.title || "Project Title"}
                </h3>

                <p
                  className={`text-md mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                >
                  {project.description || "Project description..."}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    className={` mt-2 inline-block ${theme === "dark" ? "text-[#90A955]" : "text-[#132A13]"} hover:font-semibold`}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))
          ) : (
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
            >
              No projects added
            </p>
          )}
        </div>

        {/* Social */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Social</h2>

          <div className="flex gap-4">
            {data.social.github && (
              <a
                href={data.social.github}
                target="_blank"
                className={`${theme === "dark" ? "text-[#90A955]" : "text-[#132A13]"} hover:font-semibold`}
              >
                GitHub
              </a>
            )}

            {data.social.linkedin && (
              <a
                href={data.social.linkedin}
                target="_blank"
                className={`${theme === "dark" ? "text-[#90A955]" : "text-[#132A13]"} hover:font-semibold`}
              >
                LinkedIn
              </a>
            )}
          </div>

          {!data.social.github && !data.social.linkedin && (
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
            >
              No social links added
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 ml-auto block mr-2 cursor-pointer"
      >
        Switch Portfolio Theme
      </button>
      <button
        onClick={downloadPDF}
        className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-950 ml-auto block mr-2 cursor-pointer"
      >
        Download PDF
      </button>
    </div>
  );
}

export default Output;
