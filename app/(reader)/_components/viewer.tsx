"use client";

import {useEffect, useRef, useState} from "react";
import {NavItem} from "epubjs";
import {useHrefStore} from "@/store/useHrefStore";
import {ReactReader} from "@/lib";
import {toast} from "@/components/ui/use-toast";

interface ViewerProps {
    bookName: string;
    bookFileUrl: string;
}

const Viewer = ({ bookName, bookFileUrl }: ViewerProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const headingsRef = useRef<NodeListOf<Element> | null>(null);
    const { locHref, updateLocHref } = useHrefStore((state) => state)
    const retryTimeoutRef = useRef<number | null>(null);
    const [toc, setToc] = useState<NavItem[]>([]);
    const readerRef = useRef(null);
    const elementToCopy = "h1, h2, h3, h4, h5, h6, b";
    const getTitleAndContent = (titleElement: Element) => {
        if (titleElement.matches("b")) {
            const titleContent = titleElement.textContent || "";
            let parentDiv: Element | null = titleElement;
            while (parentDiv && parentDiv.tagName !== "DIV") {
                    parentDiv = parentDiv.parentElement;
            }
            if (parentDiv) {
                let sectionContent = "";
                let nextElement = parentDiv.nextElementSibling;
                while (nextElement) {
                    if (nextElement.querySelector('b')) {
                        break;
                    }
                    sectionContent += (nextElement.textContent || "") + "\n";
                    nextElement = nextElement.nextElementSibling;
                }

                // 最终复制包含的内容
                return `${titleContent}\n${sectionContent}`;
            } else {
                return titleContent;
            }

        } else {
            const titleContent = titleElement.textContent || "";
            let nextElement = titleElement.nextElementSibling;
            let sectionContent = "";
            while (nextElement && !nextElement.matches(elementToCopy)) {

                sectionContent += (nextElement.textContent || "") + "\n";
                nextElement = nextElement.nextElementSibling;
            }
            return `${titleContent}\n${sectionContent}`;
        }
    };

    // 处理标题点击事件，复制标题及其内容
    const handleTitleClick: EventListener = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.matches(elementToCopy)) {
            const titleAndContent = getTitleAndContent(target);
            const lines = titleAndContent.split('\n');
            const content = lines.slice(1).join('\n');
            const brief = content.length > 50 ? content.slice(0, 100) + "..." : content;
            const count = titleAndContent.length;
            navigator.clipboard.writeText(titleAndContent).then(() => {
                toast({
                    title: `💾 ${target.innerText} - ${count}words`,
                    description: `${brief}`,
                    duration: 5000
                })
            });
        }
    };
    const injectContentClickListener = () => {
        const iframe = document.querySelector(".epub-view iframe") as HTMLIFrameElement;
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
                // 清除之前的监听器
                headingsRef.current?.forEach((heading) => {
                    heading.removeEventListener("click", handleTitleClick);
                });

                // 获取新的标题元素并添加监听器
                const newHeadings = iframeDoc.querySelectorAll(elementToCopy);
                newHeadings.forEach((heading) => {
                    const htmlHeading = heading as HTMLElement;
                    heading.removeEventListener("click", handleTitleClick);
                    heading.addEventListener("click", handleTitleClick);
                    htmlHeading.style.cursor= "pointer";
                    htmlHeading.style.color = '#edb1b6'
                });

                headingsRef.current = newHeadings;
            }
        }
    };


    useEffect(() => {
        injectContentClickListener();
        return () => {
            if (retryTimeoutRef.current !== null) {
                clearTimeout(retryTimeoutRef.current);
            }
        };
    }, [locHref]);

    return (
        <div ref={contentRef} className="h-full ">
            <ReactReader
                ref={readerRef}
                url={bookFileUrl}
                location={locHref}
                locationChanged={(epubHref) => updateLocHref(epubHref)}
                tocChanged={(newToc) => {setToc(newToc)}}
                getRendition={(_rendition) => {
                    const themes = _rendition.themes;
                    themes.override('color', '#f0f1f2');
                    themes.override('background', '#161c22')
                    themes.override('font-size', '22px'); // 增加字体大小
                    themes.override('font-weight', '200')
                    themes.override('line-height', '1.8')

                }}
                epubOptions={{
                    flow: "scrolled",
                }}
            />


        </div>
    );
};

export default Viewer;
