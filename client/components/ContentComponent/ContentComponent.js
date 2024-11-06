import { FilesUploadedNavBar } from "../FilesUploadedNavBar/FilesUploadedNavBar";
import { UploadContentComponent } from "../UploadContentComponent/UploadContentComponent";
import {DashboardComponent} from "../DashboardComponent/DashboardComponent";
import "./ContentComponent.css";
export function ContentComponent(props) {
  const {} = props;
  return (
    <>
    <UploadContentComponent/>
    <div id="content_container">
        <FilesUploadedNavBar/>
        <DashboardComponent/>
    </div>
    </>
  );
}
