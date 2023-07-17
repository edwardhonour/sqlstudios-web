import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParameterResolver } from 'sql-components';
import { ForcedLogoutComponent } from './auth/forced-logout/forced-logout.component';
import { InvalidTokenComponent } from './auth/invalid-token/invalid-token.component';
import { NewSigninComponent } from './auth/new-signin/new-signin.component';
import { UserEnrollComponent } from './auth/user-enroll/user-enroll.component';
import { UserLogoutComponent } from './auth/user-logout/user-logout.component';
import { DataResolver, MenuResolver, PingResolver, UserResolver } from './data.resolver';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { DocWorkspaceListComponent } from './features/doc-workspace-list/doc-workspace-list.component';
import { DocWorkspaceTableComponent } from './features/doc-workspace-table/doc-workspace-table.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { DocumentDashboardComponent } from './features/document-dashboard/document-dashboard.component';
import { AdminHomeComponent } from './features/admin-home/admin-home.component';
import { OrgDashboardComponent } from './admin/org-dashboard/org-dashboard.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { VerifyDocComponent } from './features/verify-doc/verify-doc.component';
import { DocumentListComponent } from './features/documents/document-list/document-list.component';
import { MyTeamListComponent } from './features/team/my-team-list/my-team-list.component';
import { DocumentShareListComponent } from './features/documents/document-share-list/document-share-list.component';
import { AdminOrgListComponent } from './features/organizations/admin-org-list/admin-org-list.component';
import { SurveyComponent } from './features/survey/survey.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { PhotoListComponent } from './features/photo-list/photo-list.component';
import { CommentListComponent } from './features/comment-list/comment-list.component';
import { SectionListComponent } from './admin/section-list/section-list.component';
import { SurveyTableComponent } from './pages/survey-table/survey-table.component';
import { AssessmentListComponent } from './pages/assessment-list/assessment-list.component';
import { AddAssessmentComponent } from './pages/add-assessment/add-assessment.component';
import { ThreatCatListComponent } from './admin/threat-cat-list/threat-cat-list.component';
import { ThreatCatFormComponent } from './admin/threat-cat-form/threat-cat-form.component';
import { AudioListComponent } from './pages/audio-list/audio-list.component';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { AudioClipFormComponent } from './pages/audio-clip-form/audio-clip-form.component';
import { VoiceListComponent } from './pages/voice-list/voice-list.component';
import { FacesListComponent } from './pages/faces-list/faces-list.component';
import { UploadsListComponent } from './pages/uploads-list/uploads-list.component';
import { JobQueueComponent } from './pages/job-queue/job-queue.component';

const routes: Routes = [
  { path: '', component: NewSigninComponent },
  { path: 'workspace-table', component: DocWorkspaceTableComponent },
  { path: 'workspaces', component: DocWorkspaceListComponent },
  { path: 'faces', component: FacesListComponent, resolve: { data: DataResolver }},
  { path: 'job-queue', component: JobQueueComponent, resolve: { data: DataResolver }},
  { path: 'text-to-voice', component: AudioListComponent, resolve: { data: DataResolver }},
  { path: 'text-to-video', component: VideoListComponent, resolve: { data: DataResolver }},
  { path: 'video', component: VideoListComponent, resolve: { data: DataResolver }},
  { path: 'voices', component: VoiceListComponent, resolve: { data: DataResolver }},
  { path: 'uploads', component: UploadsListComponent, resolve: { data: DataResolver }},
  { path: 'projects', component: VideoListComponent, resolve: { data: DataResolver }},
  { path: 'add-audio-clip', component: AudioClipFormComponent, resolve: { data: DataResolver }},
  { path: 'threat-cat-list', component: ThreatCatListComponent, resolve: { data: DataResolver }},
  { path: 'threat-cat-form', component: ThreatCatFormComponent, resolve: { data: DataResolver }},
  { path: 'threat-cat-form/:id', component: ThreatCatFormComponent, resolve: { data: DataResolver }},
  { path: 'orgs', component: AdminOrgListComponent, resolve: { data: DataResolver }},
  { path: 'settings', component: SettingsComponent, resolve: { data: DataResolver }},
  { path: 'photos', component: PhotoListComponent, resolve: { data: DataResolver }},
  { path: 'sections', component: SectionListComponent, resolve: { data: DataResolver }},  
  { path: 'documents', component: DocumentListComponent, resolve: { data: DataResolver }},
  { path: 'comments', component: CommentListComponent, resolve: { data: DataResolver }},
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'verify', component: VerifyDocComponent, resolve: { data: DataResolver }},
  { path: 'documents', component: DocumentListComponent, resolve: { data: DataResolver }  },
  { path: 'workspace-dashboard/:id', component: ProjectDashboardComponent, resolve: { data: DataResolver }  },
  { path: 'survey/:id', component: SurveyComponent, resolve: { data: DataResolver }  },
  { path: 'survey/:id/:id2', component: SurveyComponent, resolve: { data: DataResolver }  },
  { path: 'document-dashboard/:id', component: DocumentDashboardComponent, resolve: { data: DataResolver }  },
  { path: 'org-dashboard/:id', component: OrgDashboardComponent, resolve: { data: DataResolver }  },
  { path: 'team', component: MyTeamListComponent, resolve: { data: DataResolver }  },
  { path: 'shares', component: DocumentShareListComponent, resolve: { data: DataResolver }  },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'test/:id', component: TestPageComponent, resolve: { parameters: RouteParameterResolver } },
  { path: 'test/:id/:id2', component: TestPageComponent, resolve: { parameters: RouteParameterResolver } },
  { path: 'test/:id/:id2/:id3', component: TestPageComponent, resolve: { parameters: RouteParameterResolver } },    
  { path: 'sadmin', component: AdminDashboardComponent, resolve: { data: DataResolver, userdata: UserResolver, menudata: MenuResolver }, },
  { path: 'landing-page', component: LandingPageComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }},
  { path: 'enroll/:id', component: UserEnrollComponent , resolve: { data: DataResolver }, },
  { path: 'e/:id', component: UserEnrollComponent, resolve: { data: DataResolver }, },
  { path: 'e', component: UserEnrollComponent, resolve: { data: DataResolver }, },
  { path: 'forced-off/:id', component: ForcedLogoutComponent },
  { path: 'forced-off', component: ForcedLogoutComponent },
  { path: 'sign-in', component: NewSigninComponent },
  { path: 'error', component: InvalidTokenComponent },
  { path: 'enroll', component: UserEnrollComponent, resolve: { data: DataResolver }, },
  { path: 'user-logout', component: UserLogoutComponent },
  { path: 'enroll/:id', component: UserEnrollComponent },
  { path: 'enroll', component: UserEnrollComponent },
  { path: 'logout', component: UserLogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
