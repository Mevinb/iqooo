import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "phosphor-react-native/src/icons/ArrowLeft";
import { ArrowRightIcon } from "phosphor-react-native/src/icons/ArrowRight";
import { ArrowUpRightIcon } from "phosphor-react-native/src/icons/ArrowUpRight";
import { BookmarkSimpleIcon } from "phosphor-react-native/src/icons/BookmarkSimple";
import { BriefcaseIcon } from "phosphor-react-native/src/icons/Briefcase";
import { CalendarBlankIcon } from "phosphor-react-native/src/icons/CalendarBlank";
import { CameraIcon } from "phosphor-react-native/src/icons/Camera";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { CheckCircleIcon } from "phosphor-react-native/src/icons/CheckCircle";
import { ClockIcon } from "phosphor-react-native/src/icons/Clock";
import { CompassIcon } from "phosphor-react-native/src/icons/Compass";
import { CurrencyInrIcon } from "phosphor-react-native/src/icons/CurrencyInr";
import { GraduationCapIcon } from "phosphor-react-native/src/icons/GraduationCap";
import { HouseIcon } from "phosphor-react-native/src/icons/House";
import { InfoIcon } from "phosphor-react-native/src/icons/Info";
import { MapPinIcon } from "phosphor-react-native/src/icons/MapPin";
import { MicrophoneIcon } from "phosphor-react-native/src/icons/Microphone";
import { MinusIcon } from "phosphor-react-native/src/icons/Minus";
import { NotePencilIcon } from "phosphor-react-native/src/icons/NotePencil";
import { PaperPlaneTiltIcon } from "phosphor-react-native/src/icons/PaperPlaneTilt";
import { PathIcon } from "phosphor-react-native/src/icons/Path";
import { PauseIcon } from "phosphor-react-native/src/icons/Pause";
import { PlayIcon } from "phosphor-react-native/src/icons/Play";
import { PlusIcon } from "phosphor-react-native/src/icons/Plus";
import { SlidersHorizontalIcon } from "phosphor-react-native/src/icons/SlidersHorizontal";
import { SparkleIcon } from "phosphor-react-native/src/icons/Sparkle";
import { UserCircleIcon } from "phosphor-react-native/src/icons/UserCircle";
import { XIcon } from "phosphor-react-native/src/icons/X";
import { BookOpenIcon } from "phosphor-react-native/src/icons/BookOpen";
import { LightbulbIcon } from "phosphor-react-native/src/icons/Lightbulb";
import { ShieldCheckIcon } from "phosphor-react-native/src/icons/ShieldCheck";
import { ArrowCounterClockwiseIcon } from "phosphor-react-native/src/icons/ArrowCounterClockwise";
import { HeartIcon } from "phosphor-react-native/src/icons/Heart";
import { ChartBarIcon } from "phosphor-react-native/src/icons/ChartBar";
import { FlagIcon } from "phosphor-react-native/src/icons/Flag";
import { router } from "expo-router";
import { C, F } from "../theme";
const icons = {
  back: ArrowLeftIcon,
  arrow: ArrowRightIcon,
  external: ArrowUpRightIcon,
  bookmark: BookmarkSimpleIcon,
  briefcase: BriefcaseIcon,
  calendar: CalendarBlankIcon,
  camera: CameraIcon,
  down: CaretDownIcon,
  chevron: CaretRightIcon,
  check: CheckIcon,
  complete: CheckCircleIcon,
  clock: ClockIcon,
  compass: CompassIcon,
  rupee: CurrencyInrIcon,
  graduation: GraduationCapIcon,
  home: HouseIcon,
  info: InfoIcon,
  pin: MapPinIcon,
  mic: MicrophoneIcon,
  minus: MinusIcon,
  note: NotePencilIcon,
  send: PaperPlaneTiltIcon,
  path: PathIcon,
  pause: PauseIcon,
  play: PlayIcon,
  plus: PlusIcon,
  sliders: SlidersHorizontalIcon,
  sparkle: SparkleIcon,
  user: UserCircleIcon,
  close: XIcon,
  book: BookOpenIcon,
  bulb: LightbulbIcon,
  shield: ShieldCheckIcon,
  reset: ArrowCounterClockwiseIcon,
  heart: HeartIcon,
  chart: ChartBarIcon,
  flag: FlagIcon,
};
export type IconName = keyof typeof icons;
export function Icon({
  name,
  size = 22,
  color = C.ink,
  weight = "regular",
}: {
  name: IconName;
  size?: number;
  color?: string;
  weight?: "regular" | "bold" | "fill";
}) {
  const Component = icons[name];
  return <Component size={size} color={color} weight={weight} />;
}
export function T({
  children,
  style,
  variant = "body",
  ...props
}: TextProps & {
  variant?: "body" | "small" | "label" | "title" | "heading" | "display";
}) {
  return (
    <Text {...props} style={[s.text, s[variant], style]}>
      {children}
    </Text>
  );
}
export function Row({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[s.row, style]}>{children}</View>;
}
export function Pill({
  children,
  color = C.teal,
  bg = C.mint,
  icon,
}: {
  children: ReactNode;
  color?: string;
  bg?: string;
  icon?: IconName;
}) {
  return (
    <View style={[s.pill, { backgroundColor: bg }]}>
      {icon && <Icon name={icon} size={13} color={color} />}
      <T
        variant="small"
        style={{ color, fontFamily: F.semi, fontSize: 11, flexShrink: 1 }}
      >
        {children}
      </T>
    </View>
  );
}
export function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
  disabled,
  testID,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
}) {
  const color = variant === "primary" ? C.white : C.teal;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!disabled }}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        variant === "primary"
          ? s.primary
          : variant === "secondary"
            ? s.secondary
            : s.ghost,
        pressed && { opacity: 0.78, transform: [{ scale: 0.985 }] },
        disabled && { opacity: 0.4 },
        style,
      ]}
    >
      <T variant="label" style={{ color, textAlign: "center", flexShrink: 1 }}>
        {title}
      </T>
      {icon && <Icon name={icon} size={19} color={color} />}
    </Pressable>
  );
}
export function IconButton({
  name,
  label,
  onPress,
  bg = C.white,
  color = C.ink,
  selected = false,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
  bg?: string;
  color?: string;
  selected?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        s.iconButton,
        { backgroundColor: bg, opacity: pressed ? 0.65 : 1 },
      ]}
    >
      <Icon name={name} color={color} weight={selected ? "fill" : "regular"} />
    </Pressable>
  );
}
export function Header({
  title,
  subtitle,
  back = false,
  right,
  onBack,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  onBack?: () => void;
}) {
  return (
    <Row style={{ justifyContent: "space-between", marginBottom: 24, gap: 12 }}>
      {back && (
        <IconButton
          name="back"
          label="Go back"
          bg={C.faded}
          onPress={
            onBack ??
            (() =>
              router.canGoBack() ? router.back() : router.replace("/home"))
          }
        />
      )}
      <View style={{ flex: 1 }}>
        {title && <T variant={back ? "label" : "heading"}>{title}</T>}
        {subtitle && (
          <T variant="small" style={{ color: C.muted, marginTop: 4 }}>
            {subtitle}
          </T>
        )}
      </View>
      {right}
    </Row>
  );
}
export function Screen({
  children,
  style,
  footer,
  scroll = true,
  scrollKey,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  footer?: ReactNode;
  scroll?: boolean;
  scrollKey?: string;
}) {
  const insets = useSafeAreaInsets();
  const content = (
    <View style={[{ padding: 24, paddingTop: 18, gap: 0 }, style]}>
      {children}
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: C.bg,
        paddingTop: Platform.OS === "web" ? 0 : insets.top,
      }}
    >
      {scroll ? (
        <ScrollView
          key={scrollKey}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {footer && (
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: Math.max(18, insets.bottom),
            borderTopWidth: 1,
            borderTopColor: C.line,
            backgroundColor: C.bg,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );
}
export function SectionTitle({
  title,
  link,
  onPress,
}: {
  title: string;
  link?: string;
  onPress?: () => void;
}) {
  return (
    <Row
      style={{
        justifyContent: "space-between",
        marginTop: 26,
        marginBottom: 14,
        gap: 8,
      }}
    >
      <T variant="title" style={{ flexShrink: 1 }}>
        {title}
      </T>
      {link && (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={{ minHeight: 48, justifyContent: "center" }}
        >
          <T variant="small" style={{ color: C.teal, fontFamily: F.semi }}>
            {link}
          </T>
        </Pressable>
      )}
    </Row>
  );
}
export function Notice({
  children,
  warning = false,
}: {
  children: ReactNode;
  warning?: boolean;
}) {
  return (
    <Row
      style={{
        alignItems: "flex-start",
        gap: 9,
        backgroundColor: warning ? C.sand : C.mint,
        padding: 14,
        borderRadius: 14,
      }}
    >
      <Icon name="info" size={17} color={warning ? C.amber : C.teal} />
      <T variant="small" style={{ color: warning ? C.amber : C.teal, flex: 1 }}>
        {children}
      </T>
    </Row>
  );
}
export function Choice({
  title,
  selected,
  onPress,
  icon,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderWidth: 1,
          borderColor: selected ? C.teal : C.line,
          backgroundColor: selected ? C.mint : C.white,
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 13,
          minHeight: 48,
          opacity: pressed ? 0.75 : 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 9,
        },
      ]}
    >
      {icon && (
        <Icon name={icon} size={19} color={selected ? C.teal : C.muted} />
      )}
      <T
        style={{
          flex: 1,
          fontSize: 13,
          color: selected ? C.teal : C.ink,
          fontFamily: selected ? F.semi : F.medium,
        }}
      >
        {title}
      </T>
      {selected && <Icon name="check" size={17} color={C.teal} />}
    </Pressable>
  );
}
export function FadeIn({ children }: { children: ReactNode }) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let active = true;
    let animation: Animated.CompositeAnimation | undefined;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (!reduce && active) {
        opacity.setValue(0);
        animation = Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: Platform.OS !== "web",
        });
        animation.start();
      }
    });
    return () => {
      active = false;
      animation?.stop();
    };
  }, [opacity]);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
export function Empty({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <View style={{ paddingVertical: 44, alignItems: "center", gap: 14 }}>
      <Icon name="compass" size={40} color={C.teal} />
      <T variant="title">{title}</T>
      <T style={{ color: C.muted, textAlign: "center" }}>{detail}</T>
      {action}
    </View>
  );
}
export const s = StyleSheet.create({
  text: { color: C.ink, fontFamily: F.regular },
  body: { fontSize: 14, lineHeight: 22 },
  small: { fontSize: 12, lineHeight: 18 },
  label: { fontSize: 14, lineHeight: 21, fontFamily: F.semi },
  title: {
    fontSize: 19,
    lineHeight: 27,
    fontFamily: F.bold,
    letterSpacing: -0.6,
  },
  heading: {
    fontSize: 27,
    lineHeight: 36,
    fontFamily: F.bold,
    letterSpacing: -0.9,
  },
  display: {
    fontSize: 41,
    lineHeight: 49,
    fontFamily: F.bold,
    letterSpacing: -1.8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    maxWidth: "100%",
    flexShrink: 1,
    gap: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  primary: { backgroundColor: C.teal },
  secondary: {
    backgroundColor: C.mint,
    borderWidth: 1,
    borderColor: "#C5DED3",
  },
  ghost: { backgroundColor: "transparent" },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    borderRadius: 22,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
  },
  input: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 14,
    minHeight: 52,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontFamily: F.regular,
    fontSize: 14,
    color: C.ink,
  },
  fieldLabel: { marginBottom: 9, marginTop: 22, fontFamily: F.semi },
});
