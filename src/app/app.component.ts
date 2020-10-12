import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguageLoaderHelper, AppLanguages, Language } from './util/languages.config';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  //Listen for mobile devices
  responsiveMobileQuery: MediaQueryList;

  title = 'CRM Unique';
  availableLanguages: Language[] = [];
  selectedUserLanguageCode: string = "";
  selectedUserLanguageName: string = "";

  private responsiveMobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private translate: TranslateService, private appLanguages: AppLanguages, private appLanguageLoaderHelper: AppLanguageLoaderHelper) {
    this.selectedUserLanguageCode = this.appLanguageLoaderHelper.userLanguageCode;
    this.selectedUserLanguageName = this.appLanguageLoaderHelper.getLanguageNameFromLanguageList(this.selectedUserLanguageCode);
    this.translate.addLangs(this.appLanguages.languagesIsoCode);
    this.translate.use(this.selectedUserLanguageCode);
    this.translate.setDefaultLang(this.selectedUserLanguageCode);
    this.availableLanguages = this.appLanguages.languages;

    this.responsiveMobileQuery = media.matchMedia('(max-width: 600px)');
    this.responsiveMobileQueryListener = () => changeDetectorRef.detectChanges();
    this.responsiveMobileQuery.addEventListener("DOMContentLoaded", this.responsiveMobileQueryListener);
  }

  /**
   * Change translation to the selected language and save selected language in session.
   * @param newSelectedLanguage 
   */
  changeSelectedLanguage(newSelectedLanguage) {
    this.selectedUserLanguageCode = newSelectedLanguage.code;
    this.selectedUserLanguageName = newSelectedLanguage.value;
    this.translate.use(newSelectedLanguage.code);
    this.appLanguageLoaderHelper.userLanguageCode = newSelectedLanguage.code;
    this.selectedUserLanguageName = this.appLanguageLoaderHelper.getLanguageNameFromLanguageList(this.appLanguageLoaderHelper.userLanguageCode);
  }

  ngOnDestroy(): void {
    this.responsiveMobileQuery.removeEventListener("DOMContentLoaded", this.responsiveMobileQueryListener);
  }
}
