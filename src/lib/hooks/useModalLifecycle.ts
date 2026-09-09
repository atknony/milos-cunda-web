import { useEffect, useRef } from "react";

/**
 * Bir modal/bottom-sheet açıkken native-app davranışı sağlar. Bileşenin
 * mount/unmount ömrüne bağlıdır (modal yalnızca açıkken render edilmelidir).
 *
 * - Arka plan kaydırmayı kilitler: body'yi `position: fixed` yapıp mevcut
 *   kaydırma konumunu `top` ile telafi eder — iOS Safari'de `overflow: hidden`
 *   tek başına arka planın kaymasını engellemediği için bu teknik gerekir.
 * - Donanım/gesture geri tuşunu yakalar: açılışta sahte bir history state
 *   eklenir. Geri tuşuna basıldığında `popstate` bu state'i tüketir ve
 *   sayfadan çıkmak yerine yalnızca `onClose` çağrılır. Modal başka bir
 *   yolla (X, Vazgeç, Kaydet, arka plana tıklama) kapatılırsa, eklenen sahte
 *   state `history.back()` ile temizlenir — aksi halde bir sonraki geri
 *   basışı boşa gider.
 */
export function useModalLifecycle(onClose: () => void) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const closedByPopStateRef = useRef(false);

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const prevStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    history.pushState({ modalOpen: true }, "");

    function onPopState() {
      closedByPopStateRef.current = true;
      onCloseRef.current();
    }
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);

      body.style.position = prevStyle.position;
      body.style.top = prevStyle.top;
      body.style.left = prevStyle.left;
      body.style.right = prevStyle.right;
      body.style.width = prevStyle.width;
      body.style.overflow = prevStyle.overflow;
      window.scrollTo(0, scrollY);

      if (!closedByPopStateRef.current && history.state?.modalOpen) {
        history.back();
      }
    };
  }, []);
}
