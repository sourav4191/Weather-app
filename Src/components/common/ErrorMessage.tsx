import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AppError } from '../../utils/types';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

interface ErrorMessageProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
  style?: ViewStyle;
}

export function ErrorMessage({ error, onRetry, onDismiss, style }: ErrorMessageProps) {
  const getErrorIcon = (code?: string) => {
    switch (code) {
      case 'NETWORK_ERROR':
        return '📡';
      case 'LOCATION_PERMISSION_DENIED':
        return '📍';
      case 'LOCATION_SERVICES_DISABLED':
        return '🗺️';
      case 'API_ERROR':
        return '⚠️';
      default:
        return '❌';
    }
  };

  return (
    <View style={[errorStyles.container, style]}>
      <View style={errorStyles.content}>
        <Text style={errorStyles.icon}>{getErrorIcon(error.code)}</Text>
        <Text style={errorStyles.message}>{error.message}</Text>
      </View>
      
      <View style={errorStyles.buttons}>
        {onDismiss && (
          <TouchableOpacity 
            style={[errorStyles.button, errorStyles.dismissButton]}
            onPress={onDismiss}
          >
            <Text style={errorStyles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        )}
        
        {onRetry && (
          <TouchableOpacity 
            style={[errorStyles.button, errorStyles.retryButton]}
            onPress={onRetry}
          >
            <Text style={errorStyles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const errorStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  message: {
    ...typography.body1,
    color: colors.text,
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  dismissButton: {
    backgroundColor: colors.surface,
  },
  retryButton: {
    backgroundColor: colors.primary,
  },
  dismissButtonText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  retryButtonText: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '600',
  },
});