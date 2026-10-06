"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Partnership contact printed in the supplied SCALPIT brand proposal.
const franchisePhone = "010-9941-8870";
// Set only after the owner supplies the franchise consultation channel URL.
const kakaoChannelUrl: string | null = null;

export function FranchiseContact() {
  return <nav className="floating-contact" aria-label="빠른 가맹 상담">
    <a className="contact-shortcut contact-phone" href={`tel:${franchisePhone.replaceAll("-", "")}`} aria-label={`가맹 전화 상담 ${franchisePhone}`} title={`전화 상담 ${franchisePhone}`}>
      <Phone size={24} strokeWidth={1.7} aria-hidden="true"/><span>전화 상담</span>
    </a>
    {kakaoChannelUrl ? <a className="contact-shortcut contact-kakao" href={kakaoChannelUrl} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 가맹 상담, 새 창" title="카카오톡 상담">
      <MessageCircle size={25} fill="currentColor" strokeWidth={1.6} aria-hidden="true"/><span>카카오톡</span>
    </a> : <Dialog>
      <DialogTrigger className="contact-shortcut contact-kakao" aria-label="카카오톡 상담 안내" title="카카오톡 상담 안내">
        <MessageCircle size={25} fill="currentColor" strokeWidth={1.6} aria-hidden="true"/><span>카카오톡</span>
      </DialogTrigger>
      <DialogContent className="contact-dialog" showCloseButton={false}>
        <DialogClose className="contact-dialog-close" aria-label="상담 안내 닫기"><X size={22}/></DialogClose>
        <DialogTitle>카카오톡 상담 준비 중입니다.</DialogTitle>
        <DialogDescription>전화로 문의하시거나 가맹 상담을 신청해 주세요. 남겨주신 연락처로 안내해 드리겠습니다.</DialogDescription>
        <a href={`tel:${franchisePhone.replaceAll("-", "")}`} className="button button-wine"><Phone size={19}/>{franchisePhone}</a>
        <DialogClose asChild><a href="#meeting" className="editorial-text-link">가맹 상담 신청 <ArrowUpRight size={18}/></a></DialogClose>
      </DialogContent>
    </Dialog>}
  </nav>;
}
