import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class CommonService {

  constructor(private metaTag: Meta, private titleService: Title) { }

  changeMetaContent(page) {
    if (page == 'home') {
      this.titleService.setTitle('Top Recruitment Agencies In India- Emagine Solutions');
      this.changeTagContent('title', 'Top Recruitment Agencies In India- Emagine Solutions');
      this.changeTagContent('description', 'Emagine is Top Recruitment Agencies in India where you can find the best appropriate CVs for desired job. We provide the matching resume for posted job profiles.');
      this.changeTagContent('url', 'https://www.emagine.co.in');
    }
    else if (page == 'hiw-Employer') {
      this.titleService.setTitle('How Emagine Works- For Employers');
      this.changeTagContent('title', 'How Emagine Works- For Employers');
      this.changeTagContent('description', 'How Emagine works? It’s very easy process to use. First, click on ‘JOIN US’ then Employer can post required job description to shortlist the relevant resumes.');
      this.changeTagContent('url', 'https://www.emagine.co.in/hiw-Employer');
    }
    else if (page == 'hiw-partners') {
      this.titleService.setTitle('How Emagine Works- For Partners');
      this.changeTagContent('title', 'How Emagine Works- For Partners');
      this.changeTagContent('description', ' Emagine offers thousands of jobs with leading Indian firms where recruiter can post best resume that can match the job profiles.');
      this.changeTagContent('url', 'https://www.emagine.co.in/hiw-partners');
    }
    else if (page == 'about-us') {
      this.titleService.setTitle('Emagine- AboutUs');
      this.changeTagContent('title', 'Emagine- AboutUs');
      this.changeTagContent('description', 'Emagine changes the way the world recruits talent. This is the perfect platform where employer and recruiter can come for discussing their requirements.');
      this.changeTagContent('url', 'https://www.emagine.co.in/about-us');
    }
    else if (page == 'contact') {
      this.titleService.setTitle('Emagine- ContactUs');
      this.changeTagContent('title', 'Emagine- ContactUs');
      this.changeTagContent('description', 'Emagine is the Top Recruitment Agencies In India where you can find the satisfactory results of your choice and you get exact what you are looking for.');
      this.changeTagContent('url', 'https://www.emagine.co.in/contact');
    }
    else if (page == 'login') {
      this.titleService.setTitle('Emagine- Login');
      this.changeTagContent('title', 'Emagine- Login');
      this.changeTagContent('description', 'Emagine welcomes numerous job descriptions and for applying you need to login first. So that you can easily find the desired jobs and get the best search results.');
      this.changeTagContent('url', 'https://www.emagine.co.in/login');
    }
    else {
      this.titleService.setTitle('Top Recruitment Agencies In India- Emagine Solutions');
      this.changeTagContent('title', 'Top Recruitment Agencies In India- Emagine Solutions');
      this.changeTagContent('description', 'Emagine is Top Recruitment Agencies in India where you can find the best appropriate CVs for desired job. We provide the matching resume for posted job profiles.');
      this.changeTagContent('url', 'https://www.emagine.co.in');
    }
  }

  changeTagContent(tagName: string, tagContent: string) {
    var tag = this.metaTag.getTag("name=" + tagName + "");
    if (tag == undefined || tag == null)
      this.metaTag.addTag({ name: tagName, content: tagContent });
    else this.metaTag.updateTag({ name: tagName, content: tagContent });

    var tag = this.metaTag.getTag("property='og:" + tagName + "'");
    if (tag == undefined || tag == null)
      this.metaTag.addTag({ name: tagName, content: tagContent });
    else this.metaTag.updateTag({ property: "og:" + tagName, content: tagContent });
  }
}
