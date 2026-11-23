import { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ExternalLink, Navigation } from 'lucide-react';
import { COMPANY_INFO } from '../data/smartlinkData';

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

function OfficeMarkerWithInfo() {
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={COMPANY_INFO.chennaiCoords}
        title={COMPANY_INFO.name}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background="#56A6A0"
          borderColor="#080B10"
          glyphColor="#080B10"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="bg-[#080B10] p-2.5 text-[#DCE3E8]">
            <p className="font-display text-xs font-medium tracking-[0.08em] text-[#56A6A0] uppercase">
              SmartLink Global Logistics
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#DCE3E8]">
              Old No.64, New No.129, 4th Floor,
              <br />
              Thambu Chetty Street, Parrys,
              <br />
              Chennai – 600001, India
            </p>
            <a
              href={COMPANY_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#56A6A0] underline underline-offset-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapFooterStrip() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#25313B] bg-[#080B10] px-4 py-3">
      <div>
        <p className="text-[11px] font-medium text-[#DCE3E8]">
          Old No.64, New No.129, 4th Floor, Thambu Chetty Street, Parrys, Chennai – 600001
        </p>
        <p className="text-[11px] text-[#87929D] tabular-nums">
          13.0897° N · 80.2896° E
        </p>
      </div>
      <a
        href={COMPANY_INFO.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[36px] items-center gap-1.5 border border-[#56A6A0] bg-[#101923] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#DCE3E8] uppercase transition-colors hover:bg-[#56A6A0] hover:text-[#080B10] whitespace-nowrap"
      >
        <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Get Directions</span>
      </a>
    </div>
  );
}

export default function OfficeGoogleMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || '';
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() || 'DEMO_MAP_ID';
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const previousHandler = window.gm_authFailure;
    window.gm_authFailure = () => {
      setMapError(true);
      if (typeof previousHandler === 'function') {
        previousHandler();
      }
    };
    return () => {
      window.gm_authFailure = previousHandler;
    };
  }, []);

  if (!apiKey || mapError) {
    return (
      <div className="relative overflow-hidden border border-[#25313B] bg-[#080B10]">
        <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden bg-[#080B10]">
          <iframe
            title="SmartLink Global Logistics Chennai Office Map"
            src={COMPANY_INFO.embedMapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 invert-[0.92] hue-rotate-180 brightness-[0.9] contrast-[0.96] saturate-[0.8]"
          />
          <div className="pointer-events-none absolute left-3 top-3 border border-[#25313B] bg-[#080B10]/92 px-3 py-1.5">
            <p className="font-display text-[10px] font-medium tracking-[0.14em] text-[#56A6A0] uppercase">
              SmartLink Global Logistics
            </p>
            <p className="text-[11px] text-[#DCE3E8]">
              Thambu Chetty St, Parrys, Chennai
            </p>
          </div>
        </div>
        <MapFooterStrip />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-[#25313B] bg-[#080B10]">
      <div className="h-[340px] sm:h-[380px] w-full">
        <APIProvider
          apiKey={apiKey}
          libraries={['marker']}
          language="en"
          region="IN"
          onError={() => setMapError(true)}
        >
          <GoogleMap
            mapId={mapId}
            colorScheme="DARK"
            defaultCenter={COMPANY_INFO.chennaiCoords}
            defaultZoom={16}
            gestureHandling="cooperative"
            disableDefaultUI={false}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={true}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="h-full w-full"
          >
            <OfficeMarkerWithInfo />
          </GoogleMap>
        </APIProvider>
      </div>
      <MapFooterStrip />
    </div>
  );
}
