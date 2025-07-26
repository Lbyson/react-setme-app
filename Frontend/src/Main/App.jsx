import "@/Main/App.css";
import Header from "@/Components/Header/Header.tsx";
import WelcomingSection from "@/Components/WelcomingSection/WelcomingSection.tsx";
import TabsSection from "@/Components/ButtonsSection/TabsSection.tsx";
import { useState } from "react";
import FeedbackSection from "@/Components/FeedbackSection/FeedbackSection.module.tsx";
import ProfilesSection from "@/Components/ProfilesSection/ProfilesSection.tsx";
import FetchSection from "@/Components/FetchSection/FetchSection.tsx";
import LearnSection from "@/Components/LearnSection/LearnSection.tsx";

function App({ themeState, setThemeState }) {
  const [tab, setTab] = useState("fetch");
  const module = "math";

  return (
    <>
      <Header theme={themeState} setThemeState={setThemeState} />

      <main>
        <TabsSection active={tab} onChange={setTab} theme={themeState} />
        {tab === "welcoming" && (
          <>
            <WelcomingSection />
          </>
        )}

        {tab === "feedback" && <FeedbackSection theme={themeState} />}
        {tab === "profiles" && <ProfilesSection theme={themeState} />}
        {tab === "fetch" && <FetchSection type={module} theme={themeState} />}
        {tab === "learn" && <LearnSection theme={themeState} />}
      </main>
    </>
  );
}

export default App;
