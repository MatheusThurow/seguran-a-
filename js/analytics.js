import {analyticsConfig} from './analytics-config.js';
const id=analyticsConfig.measurementId;
const enabled=/^G-[A-Z0-9]+$/.test(id);
if(enabled){
 window.dataLayer=window.dataLayer||[];
 window.gtag=function(){window.dataLayer.push(arguments)};
 window.gtag('js',new Date());
 window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,debug_mode:analyticsConfig.debug});
 const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.append(script);
}
export function track(name,params={}){if(!enabled)return;try{window.gtag('event',name,params)}catch{}}
export function trackActivity(event,data){
 const params={activity_stage:event.stage,elapsed_ms:event.elapsedMs};
 if(Number.isFinite(event.analysisMs))params.analysis_ms=event.analysisMs;
 if(Number.isFinite(event.valueMs))params.analysis_ms=event.valueMs;
 if(event.name==='respondeu_quiz_inicial')params.quiz_score=data.pre.score;
 if(event.name==='respondeu_quiz_final')params.quiz_score=data.post.score;
 track(event.name,params);
}
